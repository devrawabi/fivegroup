import {
  FeaturesSectionWithCardGradient,
  GridBackground as Grid,
  GridPattern,
} from '@/components/ui/gradient-card'

const grid = [
  {
    title: 'HIPAA and SOC2 Compliant',
    description:
      'Our applications are HIPAA and SOC2 compliant, your data is safe with us, always.',
  },
  {
    title: 'Automated Social Media Posting',
    description:
      'Schedule and automate your social media posts across multiple platforms to save time and maintain a consistent online presence.',
  },
  {
    title: 'Advanced Analytics',
    description:
      'Gain insights into your social media performance with detailed analytics and reporting tools to measure engagement and ROI.',
  },
  {
    title: 'Content Calendar',
    description:
      'Plan and organize your social media content with an intuitive calendar view, ensuring you never miss a post.',
  },
  {
    title: 'Audience Targeting',
    description:
      'Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.',
  },
  {
    title: 'Social Listening',
    description:
      'Monitor social media conversations and trends to stay informed about what your audience is saying and respond in real-time.',
  },
  {
    title: 'Customizable Templates',
    description:
      'Create stunning social media posts with our customizable templates, designed to fit your brand\'s unique style and voice.',
  },
  {
    title: 'Collaboration Tools',
    description:
      'Work seamlessly with your team using our collaboration tools, allowing you to assign tasks, share drafts, and provide feedback in real-time.',
  },
]

export function FeaturesSectionWithCardGradientDemo() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute left-0 top-0 w-full">
        <FeaturesSectionWithCardGradient features={grid} />
      </div>
    </div>
  )
}

export { FeaturesSectionWithCardGradient, Grid, GridPattern, grid }
