'use client';

import { useState, useRef } from 'react';
import { sendChatMessage } from '@/actions/waitlist';

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
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);

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
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '이미지 압축 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      return result.images;
    } catch (error) {
      console.error('Image compression error:', error);
      throw error;
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
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
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
      <div className="max-w-4xl mx-auto px-4">
        {/* 이미지 미리보기 */}
        {selectedImages.length > 0 && (
          <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                첨부된 이미지 ({selectedImages.length}/5)
              </span>
              <span className="text-xs text-gray-500">
                전송 시 자동으로 압축됩니다 (최대 1MB)
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
                    disabled={isLoading}
                  >
                    ×
                  </button>
                  <div className="text-xs text-gray-500 mt-1 truncate w-16" title={file.name}>
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
              placeholder="반려동물에 관한 무엇이든 질문하세요."
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
              title={selectedImages.length >= 5 ? "최대 5개의 이미지만 업로드 가능합니다" : "이미지 첨부"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* 전송 버튼 */}
            <button
              type="submit"
              disabled={(!message.trim() && selectedImages.length === 0) || isLoading}
              className="text-white p-3 rounded-full bg-black hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
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
            <span className="text-sm text-gray-600">이미지를 압축하고 있습니다...</span>
          </div>
        )}
      </div>
    </div>
  );
}
