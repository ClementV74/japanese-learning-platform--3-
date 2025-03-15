export function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Students Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our community of Japanese language learners about their experience with our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "This platform has transformed my Japanese learning journey. The structured approach and interactive
                quizzes make learning enjoyable and effective."
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="font-medium">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Studying for 8 months</div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "The Kanji learning module is exceptional. The stroke order animations and character breakdowns have
                made learning Kanji much less intimidating."
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="font-medium">David Chen</div>
              <div className="text-sm text-muted-foreground">Studying for 1 year</div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-yellow-500"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground">
                "I've tried many Japanese learning platforms, but this one stands out. The progress tracking keeps me
                motivated, and the quizzes reinforce what I've learned."
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="font-medium">Maria Rodriguez</div>
              <div className="text-sm text-muted-foreground">Studying for 6 months</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

