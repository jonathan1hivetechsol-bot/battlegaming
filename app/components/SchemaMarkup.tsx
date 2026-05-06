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
  };
}

export const SchemaMarkup: FC<SchemaMarkupProps> = ({ product }) => {
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
        telephone: '+1-780-851-1699',
        email: 'support@battlegaming.store',
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
      ratingValue: '4.9',
      ratingCount: '50000',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
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
        reviewBody:
          'Excellent service, account delivered instantly with full security. Highly recommend!',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Pro Player',
        },
        reviewBody:
          'BattleGaming is the most trusted verified account provider. 24/7 support is amazing.',
      },
    ],
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
    telephone: '+1-780-851-1699',
    email: 'support@battlegaming.store',
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
      telephone: '+1-780-851-1699',
      contactType: 'Customer Support',
      email: 'support@battlegaming.store',
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
