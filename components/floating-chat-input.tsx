'use client';

import { useState, useRef } from 'react';
import { sendChatMessage } from '@/actions/waitlist';
import imageCompression from 'browser-image-compression';

interface FloatingChatInputProps {
  onMessageSent: (message: string) => void;
}

interface CompressedImage {
  name: string;
  data: string;
  size: number;
}

export default function FloatingChatInput({
  onMessageSent,
}: FloatingChatInputProps) {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isCompressingImages, setIsCompressingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + selectedImages.length > 5) {
      alert('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // 미리보기 URL 생성
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);

    // 이전 URL 해제
    URL.revokeObjectURL(imagePreviewUrls[index]);

    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const compressImages = async (files: File[]): Promise<CompressedImage[]> => {
    setIsCompressingImages(true);

    try {
      const compressedImages: CompressedImage[] = [];
      const targetSizeKB = 150; // 목표 크기 150KB

      for (const file of files) {
        try {
          let compressedFile = file;
          let quality = 0.9; // 시작 품질
          let maxWidthOrHeight = 1920; // 시작 해상도

          // 150KB 이하가 될 때까지 반복 압축
          while (compressedFile.size > targetSizeKB * 1024 && quality > 0.1) {
            const options = {
              maxSizeMB: targetSizeKB / 1024, // 150KB를 MB로 변환
              maxWidthOrHeight: maxWidthOrHeight,
              useWebWorker: true,
              quality: quality,
              fileType: 'image/jpeg' as const,
            };

            try {
              compressedFile = await imageCompression(file, options);

              // 목표 크기에 도달했으면 중단
              if (compressedFile.size <= targetSizeKB * 1024) {
                break;
              }

              // 아직 크면 품질을 낮추고 해상도도 줄임
              quality -= 0.1;
              if (quality <= 0.5 && maxWidthOrHeight > 800) {
                maxWidthOrHeight = Math.max(800, maxWidthOrHeight * 0.8);
              }
            } catch (compressionError) {
              console.warn(
                `Compression attempt failed for ${file.name}:`,
                compressionError
              );
              break;
            }
          }

          // 여전히 크면 최종 강력 압축 시도
          if (compressedFile.size > targetSizeKB * 1024) {
            const finalOptions = {
              maxSizeMB: targetSizeKB / 1024,
              maxWidthOrHeight: 600,
              useWebWorker: true,
              quality: 0.3,
              fileType: 'image/jpeg' as const,
            };

            try {
              compressedFile = await imageCompression(file, finalOptions);
            } catch (finalError) {
              console.warn(
                `Final compression failed for ${file.name}:`,
                finalError
              );
            }
          }

          // Base64로 변환
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              // data:image/jpeg;base64, 부분 제거
              const base64 = result.split(',')[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });

          compressedImages.push({
            name: file.name,
            data: base64Data,
            size: compressedFile.size,
          });

          console.log(
            `Image ${file.name}: ${(file.size / 1024).toFixed(1)}KB → ${(
              compressedFile.size / 1024
            ).toFixed(1)}KB`
          );
        } catch (error) {
          console.error(`Error compressing image ${file.name}:`, error);
          // 개별 이미지 압축 실패 시 원본 파일로 처리 (하지만 150KB 초과 경고)
          if (file.size > targetSizeKB * 1024) {
            alert(
              `${file.name}이 ${targetSizeKB}KB를 초과합니다. 더 작은 이미지를 선택해주세요.`
            );
            continue; // 이 이미지는 건너뛰기
          }

          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              const base64 = result.split(',')[1];
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          compressedImages.push({
            name: file.name,
            data: base64Data,
            size: file.size,
          });
        }
      }

      return compressedImages;
    } catch (error) {
      console.error('Image compression error:', error);
      throw new Error('이미지 압축 중 오류가 발생했습니다.');
    } finally {
      setIsCompressingImages(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && selectedImages.length === 0) return;

    setIsSendingMessage(true);

    try {
      let compressedImages: CompressedImage[] | undefined;

      // 이미지가 있으면 압축
      if (selectedImages.length > 0) {
        compressedImages = await compressImages(selectedImages);
      }

      // Slack으로 채팅 메시지 전송
      await sendChatMessage(message || '이미지 첨부', compressedImages);

      // 부모 컴포넌트에 메시지 전송 알림
      onMessageSent(message || '이미지를 첨부했습니다.');

      // 입력창 및 이미지 초기화
      setMessage('');
      setSelectedImages([]);

      // 미리보기 URL 해제
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
      setImagePreviewUrls([]);
    } catch (error) {
      console.error('Error sending chat message:', error);
      alert('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const isLoading = isSendingMessage || isCompressingImages;

  return (
    <div className="floating-chat-input">
      <div className="max-w-4xl">
        {/* 이미지 미리보기 */}
        {selectedImages.length > 0 && (
          <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                첨부된 이미지 ({selectedImages.length}/5)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imagePreviewUrls[index]}
                    alt={`미리보기 ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isLoading}>
                    ×
                  </button>
                  <div
                    className="text-xs text-gray-500 mt-1 truncate w-16"
                    title={file.name}>
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={handleChatSubmit}
          className="flex items-end space-x-3 rounded-lg p-3 border bg-white border-gray-300 shadow-sm">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="반려동물에 대한 무엇이든 물어보세요"
              className="w-full px-2 py-2 focus:outline-none text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* 이미지 첨부 버튼 */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || selectedImages.length >= 5}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                selectedImages.length >= 5
                  ? '최대 5개의 이미지만 업로드 가능합니다'
                  : '이미지 첨부'
              }>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={
                (!message.trim() && selectedImages.length === 0) || isLoading
              }
              className="text-white p-3 rounded-full bg-black hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
            disabled={isLoading}
          />
        </form>

        {/* 로딩 상태 표시 */}
        {isCompressingImages && (
          <div className="text-center mt-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">
                이미지를 150KB 이하로 압축하고 있습니다...
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              큰 이미지는 압축에 시간이 걸릴 수 있습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
