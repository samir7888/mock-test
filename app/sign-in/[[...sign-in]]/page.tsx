import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "shadow-none border-0 bg-transparent w-full",
                card: "bg-transparent p-0 w-full",
                headerTitle: "text-zinc-100 font-extrabold text-2xl tracking-tight text-center",
                headerSubtitle: "text-zinc-400 text-sm text-center",
                socialButtonsBlockButton: "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium transition-all duration-200",
                socialButtonsBlockButtonText: "text-zinc-200 font-semibold",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-500 text-xs uppercase",
                formFieldLabel: "text-zinc-300 font-medium text-xs",
                formFieldInput: "bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500 text-zinc-100 rounded-lg py-2.5 transition-all duration-200",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-200",
                footerActionText: "text-zinc-400 text-xs",
                footerActionLink: "text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200",
              }
            }}
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
}
