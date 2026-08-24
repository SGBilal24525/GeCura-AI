import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type CtaBannerProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

export default function CtaBanner({ title, description, buttonText, buttonLink }: CtaBannerProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
            {title}
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <Button asChild size="lg" className="w-full group">
            <Link href={buttonLink}>
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
