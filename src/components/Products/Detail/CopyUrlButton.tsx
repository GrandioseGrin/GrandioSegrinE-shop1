// Import necessary modules
import { usePathname } from "next/navigation"; // Using next/navigation for Next.js 14+
import toast from "react-hot-toast"; // Import toast for notification

const CopyUrlButton = () => {
  const pathname = usePathname(); // Get current path using next/navigation

  const handleCopyUrl = () => {
    // Get the full current URL
    const currentUrl = window.location.origin + pathname;

    // Try to copy the URL to clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // Show a success toaster notification
        toast.success("Product copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
        toast.error("Failed to copy URL");
      });
  };

  return (
    <button onClick={handleCopyUrl} className="text-p_black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
        />
      </svg>
    </button>
  );
};

export default CopyUrlButton;
