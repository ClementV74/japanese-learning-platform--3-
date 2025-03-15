import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose Your Learning Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the plan that best fits your learning goals and budget.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-muted-foreground">Get started with basic Japanese learning.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $0
              <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Basic Hiragana & Katakana lessons",
                "Limited vocabulary exercises",
                "Community forum access",
                "Progress tracking",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary-foreground">Premium</h3>
              <p className="text-primary-foreground/80">Our most popular plan for serious learners.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold text-primary-foreground">
              $12
              <span className="ml-1 text-base font-medium text-primary-foreground/80">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "All Hiragana & Katakana lessons",
                "Complete Kanji lessons (N5-N1)",
                "Full vocabulary & grammar exercises",
                "Interactive quizzes & tests",
                "Personalized learning path",
                "Progress analytics",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm text-primary-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="secondary" className="w-full">
                  Start Premium
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-muted-foreground">For advanced learners and professionals.</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $29
              <span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Everything in Premium",
                "1-on-1 tutoring sessions",
                "Business Japanese modules",
                "Specialized vocabulary sets",
                "Pronunciation feedback",
                "JLPT exam preparation",
                "Certificate of completion",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  Start Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

