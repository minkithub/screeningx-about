'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function VeterinarianContactSection() {
  const [formData, setFormData] = useState({
    clinicName: '',
    directorName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/veterinarian-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          clinicName: '',
          directorName: '',
          phone: '',
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              문의가 접수되었습니다
            </h3>
            <p className="text-gray-600 mb-6">
              문의 후 3영업일 이내로 연락드리겠습니다.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-custom-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            혹시 수의사이신가요?
            <br />
            고객들을 위해
            <br />
            펫쏙쏙을 도입해보세요.
          </h2>
          <p className="text-sm text-gray-600">
            문의 후 3영업일 이내로 연락드리겠습니다.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="clinicName"
              className="block text-sm font-semibold text-gray-700 mb-2">
              병원 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleInputChange}
              required
              className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="병원 이름을 입력해주세요"
            />
          </div>

          <div>
            <label
              htmlFor="directorName"
              className="block text-sm font-semibold text-gray-700 mb-2">
              원장님 성함 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="directorName"
              name="directorName"
              value={formData.directorName}
              onChange={handleInputChange}
              required
              className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="원장님 성함을 입력해주세요"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2">
              원장님 연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="연락처를 입력해주세요"
            />
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.clinicName ||
                !formData.directorName ||
                !formData.phone
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 w-full text-lg font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? '제출 중...' : '도입 문의하기'}
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
