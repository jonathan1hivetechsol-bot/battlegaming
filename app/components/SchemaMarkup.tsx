import { FC } from 'react';

interface SchemaMarkupProps {
  product: {
    name: string;
    description: string;
    price: number;
    url: string;
    image?: string;
    game: string;
    platform: string;
    wins: number;
    region: string;
    average_rating?: number;
    review_count?: number;
    reviews?: Array<{
      reviewer_name: string;
      rating: number;
      review_text: string;
      verified_purchase: boolean;
    }>;
    buying_amount?: number;
  };
}

export const SchemaMarkup: FC<SchemaMarkupProps> = ({ product }) => {
  // Use actual ratings from database, fallback to defaults
  const ratingValue = product.average_rating?.toFixed(1) || '4.9';
  const ratingCount = product.review_count?.toString() || (product.buying_amount?.toString() || '50000');
  const reviews = product.reviews?.map(review => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating.toString(),
    },
    author: {
      '@type': 'Person',
      name: review.reviewer_name,
    },
    reviewBody: review.review_text,
  })) || [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Verified Buyer',
      },
      reviewBody: 'Excellent service, account delivered instantly with full security. Highly recommend!',
    },
  ];

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'BattleGaming',
      url: 'https://battlegaming.store',
      logo: 'https://battlegaming.store/logo.svg',
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'USD',
      price: product.price.toString(),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'BattleGaming',
        url: 'https://battlegaming.store',
        telephone: '+15795507750',
        email: 'contact@digizaro.com',
        sameAs: ['https://twitter.com/battlegaming', 'https://facebook.com/battlegaming'],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
          addressRegion: 'Online',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      ratingCount: ratingCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews,
    potentialAction: {
      '@type': 'BuyAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: product.url,
        actionPlatform: ['DesktopWebPlatform', 'MobileWebPlatform'],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};

/**
 * Organization Schema for homepage and site-wide trust
 */
export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Organization',
    name: 'BattleGaming',
    url: 'https://battlegaming.store',
    logo: 'https://battlegaming.store/logo.svg',
    description: 'Elite verified Call of Duty accounts with instant delivery and lifetime warranty',
    telephone: '+15795507750',
    email: 'contact@digizaro.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'United States',
      addressRegion: 'USA',
    },
    sameAs: [
      'https://twitter.com/battlegaming',
      'https://facebook.com/battlegaming',
      'https://instagram.com/battlegaming',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+15795507750',
      contactType: 'Customer Support',
      email: 'contact@digizaro.com',
      areaServed: ['US', 'UK', 'CA'],
      availableLanguage: ['English'],
    },
    founder: {
      '@type': 'Organization',
      name: 'BattleGaming Team',
    },
    knowsAbout: [
      'Call of Duty Accounts',
      'Gaming Services',
      'Account Marketplace',
      'Competitive Gaming',
    ],
    image: 'https://battlegaming.store/hero.jpg',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};

/**
 * FAQPage Schema for SEO
 */
export const FAQSchema = () => {
  const faqs = [
    {
      question: 'Are BattleGaming accounts safe and verified?',
      answer:
        'Yes, all our accounts are 100% verified, anti-cheat clean, and backed by a lifetime warranty. We have a 99.8% delivery success rate.',
    },
    {
      question: 'How fast is the account delivery?',
      answer: 'Most accounts are delivered within 3 minutes of purchase. You can start playing immediately.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a 30-day money-back guarantee if you are not satisfied with your purchase. No questions asked.',
    },
    {
      question: 'Do you offer accounts for different regions?',
      answer:
        'Yes, we offer accounts optimized for USA, UK, California, Texas, New York, London, and Manchester with region-specific server optimization.',
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Absolutely. We use SSL encryption, secure password hashing, and comply with GDPR and CCPA regulations to protect your data.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
};

export default SchemaMarkup;
