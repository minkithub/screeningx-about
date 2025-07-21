import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { sendApplicationNotification } from '@/actions/waitlist';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationModal({
  isOpen,
  onClose,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountInfo = {
    bank: '카카오',
    account: '3333036855187',
    holder: '이재승',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyAccountInfo = () => {
    navigator.clipboard.writeText(accountInfo.account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setIsSubmitting(true);
    try {
      await sendApplicationNotification(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', contact: '' });
      }, 3000);
    } catch (error) {
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          /* Success Message */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">신청 완료!</h3>
            <p className="text-gray-600">
              곧 연락드리겠습니다.
              <br />
              감사합니다!
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                얼리버드 신청
              </h2>
              <p className="text-gray-600">
                월 4,900원 특가로 SwitchAI를 시작하세요
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="010-1234-5678 또는 이메일"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.contact}
                className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                {isSubmitting ? '신청 중...' : '신청하기'}
              </button>
              <p className="text-sm text-black text-center mt-2">
                신청 후 연락처로 결제정보를 알려드립니다.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
