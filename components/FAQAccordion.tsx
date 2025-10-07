'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/lib/types';

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 animate-fade-in">
          <div className="text-gray-700 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQAccordion({ faqs, title = "Usein Kysytyt Kysymykset" }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(faqs.map((_, index) => index)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={openAll}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Avaa kaikki
          </button>
          <button
            onClick={closeAll}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sulje kaikki
          </button>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FAQItemComponent
            key={index}
            faq={faq}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Etsitkö lisätietoja?
          </h3>
          <p className="text-gray-600 mb-4">
            Jos et löytänyt vastausta kysymykseesi, ota yhteyttä paikallisiin asennusyrityksiin saadaksesi henkilökohtaista neuvontaa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn-primary">
              Ota yhteyttä asiantuntijoihin
            </button>
            <button className="btn-secondary">
              Lataa opas PDF:nä
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
