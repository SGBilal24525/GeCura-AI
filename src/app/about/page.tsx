import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CtaBanner from '@/components/cta-banner';

const missionImage = PlaceHolderImages.find((p) => p.id === 'mission-image');
const storyImage = PlaceHolderImages.find((p) => p.id === 'story-image');

const team = [
  {
    name: 'Dr. Hafiz Zargham',
    role: 'CEO & Doctor, Sultan Pharma',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    name: 'Gepard Tech',
    role: 'AI System Developer',
    avatar: 'https://i.pravatar.cc/150?u=gepard',
  },
  {
    name: 'SG Bilal',
    role: 'CEO, Gepard Tech',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                About CuraAI
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                We are a passionate team of doctors and technologists dedicated to making healthcare simpler, smarter, and more accessible for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Our Mission
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    Our mission is to bridge the gap between complex medical knowledge and everyday understanding. We believe that by leveraging the power of artificial intelligence, we can empower students to learn more effectively, patients to understand their health better, and professionals to deliver care more efficiently. We are committed to building technology that is not only intelligent but also empathetic and accessible.
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center relative">
                {missionImage && (
                  <Image
                    src={missionImage.imageUrl}
                    alt={missionImage.description}
                    width={550}
                    height={310}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover w-full animate-float transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    data-ai-hint={missionImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex justify-center items-center relative order-last lg:order-first">
                 {storyImage && (
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    width={550}
                    height={310}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover w-full animate-float transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    data-ai-hint={storyImage.imageHint}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Our Story
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    CuraAI was born from a collaboration between Sultan Pharma, a trusted name in medical care, and Gepard Tech, a leader in AI innovation. We saw a shared opportunity to solve a critical problem: the inaccessibility of medical information. Students struggled with dense textbooks, and patients felt overwhelmed by medical jargon. We decided to combine our expertise to create a solution. The result is CuraAI, a platform that embodies our belief in a future where technology and human care work hand-in-hand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                    Meet the Team
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The minds behind CuraAI, combining medical expertise with cutting-edge technology.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12 mt-12">
                    {team.map((member) => (
                        <div key={member.name} className="flex flex-col items-center text-center">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <CtaBanner
        title="Ready to Join the Healthcare Revolution?"
        description="Sign up today and experience the future of medical intelligence."
        buttonText="Sign Up Now"
        buttonLink="/signup"
      />
    </>
  );
}
