import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
            Gallery Streaks
        </h1>
        <p className="text-white text-lg">
          Capture a glimpse for your special moments from family and friends
        </p>

        <div>
          <LoginButton  asChild>
            <Button size="lg" variant="secondary">Get Started</Button>
          </LoginButton>
         
        </div>
      </div>
    </main>
   
   
  )
}
