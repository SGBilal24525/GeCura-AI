export type PlanFeature = {
  text: string;
  included: boolean;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  period: 'monthly' | 'yearly' | 'one-time';
  description: string;
  features: PlanFeature[];
};

export const plans: { [key: string]: Plan } = {
    'standard-monthly': {
        id: 'standard-monthly',
        name: 'Standard Plan',
        price: 4.99,
        priceFormatted: '$4.99',
        period: 'monthly',
        description: 'For serious students & general users.',
        features: [
            { text: 'All Free plan features', included: true },
            { text: 'Smart Answer (Image Analysis)', included: true },
            { text: 'Medium daily AI usage limits', included: true },
            { text: 'Saved answers & learning history', included: true },
        ],
    },
    'premium-monthly': {
        id: 'premium-monthly',
        name: 'Premium Plan',
        price: 19.99,
        priceFormatted: '$19.99',
        period: 'monthly',
        description: 'For health-focused users & patients.',
        features: [
            { text: 'All Standard plan features', included: true },
            { text: 'AI Doctor (humanized consultation)', included: true },
            { text: 'Higher AI usage limits', included: true },
            { text: 'Priority AI responses', included: true },
            { text: 'Health conversation history', included: true },
        ],
    },
     'standard-yearly': {
        id: 'standard-yearly',
        name: 'Standard Plan',
        price: 14.99,
        priceFormatted: '$14.99',
        period: 'yearly',
        description: 'Save big for serious students & general users.',
        features: [
             { text: 'All Free plan features', included: true },
            { text: 'Smart Answer (Image Analysis)', included: true },
            { text: 'Medium daily AI usage limits', included: true },
            { text: 'Saved answers & learning history', included: true },
        ],
    },
    'premium-yearly': {
        id: 'premium-yearly',
        name: 'Premium Plan',
        price: 49.99,
        priceFormatted: '$49.99',
        period: 'yearly',
        description: 'Best value for health-focused users & patients.',
        features: [
            { text: 'All Standard plan features', included: true },
            { text: 'AI Doctor (humanized consultation)', included: true },
            { text: 'Higher AI usage limits', included: true },
            { text: 'Priority AI responses', included: true },
            { text: 'Health conversation history', included: true },
        ],
    },
    'lifetime-standard': {
        id: 'lifetime-standard',
        name: 'Lifetime Standard',
        price: 99.99,
        priceFormatted: '$99.99',
        period: 'one-time',
        description: 'All Standard plan features, forever. No recurring fees.',
         features: [
            { text: 'All Standard plan features', included: true },
            { text: 'Lifetime access & updates', included: true },
            { text: 'No monthly or yearly fees', included: true },
        ],
    }
};
