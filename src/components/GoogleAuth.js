import { FaGoogle } from "react-icons/fa";

const GoogleAuth = () => {
  const getUrl = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
        { credentials: "include" }
      );
      const json = await response.json();
      const redirectUrl = json.url;

      window.location.href = redirectUrl;
    } catch {
      console.log("failed to get redirect url");
    }
  };

  return (
    <button
      className="inline-flex items-center py-2 bg-red-700 rounded hover:bg-red-600 w-full"
      type="button"
      onClick={getUrl}
    >
      <FaGoogle className="mx-6 text-lg text-white absolute" />
      <div className="mx-auto">
        <p className="text-white">Continue with Google</p>
      </div>
    </button>
  );
};

export default GoogleAuth;
