import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    captchaInput: "",
  });

  // Генерация случайного кода капчи
  const generateCaptcha = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    if (formData.captchaInput !== captchaCode) {
      alert("Неверный код подтверждения");
      setCaptchaCode(generateCaptcha());
      setFormData((prev) => ({ ...prev, captchaInput: "" }));
      return;
    }

    // Формируем сообщение для WhatsApp
    const whatsappNumber = "+79688962597";
    const message = `Новый запрос на разработку приложения%0A%0AИмя: ${encodeURIComponent(formData.name)}%0AТелефон: ${encodeURIComponent(formData.phone)}%0AEmail: ${formData.email ? encodeURIComponent(formData.email) : "не указан"}%0A%0AСообщение:%0A${encodeURIComponent(formData.message)}%0A%0AЦена: от 500 ₽`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Открываем WhatsApp
    window.open(whatsappUrl, "_blank");

    // Очищаем форму
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
      captchaInput: "",
    });
    setCaptchaCode(generateCaptcha());
    setShowForm(false);

    alert("Спасибо! Сейчас откроется WhatsApp для отправки сообщения.");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setCaptchaCode(generateCaptcha());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Анимированный ноутбук */}
            <div className="relative mb-8">
              <div className="laptop-container perspective-1000">
                <div className="laptop-screen transform-preserve-3d rotate-x-10 w-72 h-48 bg-black border-8 border-gray-300 rounded-t-lg mx-auto relative overflow-hidden shadow-lg">
                  <div className="binary-code absolute inset-0 flex flex-col justify-center items-center gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="binary-row flex gap-1 animate-pulse"
                      >
                        {[...Array(16)].map((_, j) => (
                          <span
                            key={j}
                            className="text-green-400 font-mono text-xs opacity-80"
                          >
                            {Math.random() > 0.5 ? "1" : "0"}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="laptop-base w-80 h-3 bg-gray-300 -mx-4 mt-0 rounded-b-lg relative shadow-md">
                  <div className="laptop-keyboard w-72 h-2 bg-gray-800 mx-auto rounded-b-sm"></div>
                </div>
              </div>
            </div>

            {/* Профиль */}
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Тимофей Берензон
            </h2>

            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
                Разработка приложений
              </span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
                от 500 ₽
              </span>
            </div>

            {/* Кнопка связи */}
            <Button
              onClick={toggleForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold mb-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {showForm ? "Скрыть форму" : "Связаться со мной"}
            </Button>

            {/* Форма обратной связи */}
            {showForm && (
              <Card className="mt-6 animate-fade-in">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                      <Label
                        htmlFor="name"
                        className="text-sm font-bold mb-2 block"
                      >
                        Ваше имя
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ваше имя"
                        required
                        className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div className="text-left">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-bold mb-2 block"
                      >
                        Ваш телефон
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+7 (999) 123-45-67"
                        required
                        className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div className="text-left">
                      <Label
                        htmlFor="email"
                        className="text-sm font-bold mb-2 block"
                      >
                        Ваш email (необязательно)
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@mail.com"
                        className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div className="text-left">
                      <Label
                        htmlFor="message"
                        className="text-sm font-bold mb-2 block"
                      >
                        Опишите ваше приложение
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Какое приложение вам нужно?"
                        rows={5}
                        required
                        className="w-full p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    {/* Капча */}
                    <div className="text-left">
                      <Label className="text-sm font-bold mb-2 block">
                        Подтвердите, что вы не робот
                      </Label>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded border font-mono text-xl tracking-widest select-none">
                          {captchaCode}
                        </div>
                        <Input
                          name="captchaInput"
                          value={formData.captchaInput}
                          onChange={handleInputChange}
                          placeholder="Введите код"
                          required
                          className="flex-1 p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <Icon name="MessageCircle" className="mr-2" size={20} />
                      Отправить в WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
