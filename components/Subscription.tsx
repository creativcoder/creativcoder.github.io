
export default function Subscription() {
    return (
        <div
          id="revue-embed"
          className="border border-slate-200 space-y-2 p-6 my-4 w-full dark:border-gray-600 dark:bg-[#2b2e30] bg-blue-50 dark:bg-blue-opaque rounded-md"
        >
          <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            Subscribe to the newsletter
          </p>
          <p className="my-1 text-gray-800 dark:text-gray-200">
            Get emails from me about Rust, tech, and early access to new articles.
          </p>
          <form
            action="https://www.getrevue.co/profile/creativcoder/add_subscriber"
            method="post"
            className="relative"
            id="revue-form"
            name="revue-form"
            target="_blank"
          >
            <div className="revue-form-group">
              <input
                className="revue-form-field px-4 py-3 mt-1 focus:border-blue-500 block w-full border-gray-300 rounded-md dark:bg-gray-200 bg-white dark:text-gray-900 pr-32"
                placeholder="Your email address..."
                type="email"
                required
                name="member[email]"
                id="member_email"
              />
            </div>
            <div className="revue-form-actions">
              <input
                className="flex items-center justify-center absolute right-1 top-1 px-4 pt-2 pb-2 font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
                type="submit"
                value="Subscribe"
                name="member[subscribe]"
                id="member_submit"
              />
            </div>
            <div className="revue-form-footer text-xs pt-4">
              By subscribing, you agree with Revue’s{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.getrevue.co/terms"
                className="hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.getrevue.co/privacy"
                className="hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </form>
        </div>
      );
}