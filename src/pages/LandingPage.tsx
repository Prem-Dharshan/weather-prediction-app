import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-background text-foreground overflow-hidden">
      <h1 className="text-3xl font-bold">Weather Prediction App</h1>
      <Link to="/dashboard">
        <Button className="mt-4">Go to Dashboard</Button>
      </Link>
      <footer className="absolute bottom-4 text-sm">
        Developed by{" "}
        <a
          href="https://github.com/prem-dharshan"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          DPD
        </a>
      </footer>
    </div>
  );
}