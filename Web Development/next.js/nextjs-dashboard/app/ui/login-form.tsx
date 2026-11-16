import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { signInWithMicrosoftEntra } from '@/app/lib/actions';

export default function LoginForm() {
  return (
    <form action={signInWithMicrosoftEntra} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Sign in with your Microsoft account.
        </h1>
        <Button className="mt-4 w-full" type="submit">
          Continue with Microsoft
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}