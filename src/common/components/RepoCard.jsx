export default function RepoCard({ repo }) {
  const updatedLabel = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString()
    : "Unknown";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              {repo.name}
            </a>
          </h3>
          {repo.description && (
            <p className="mt-1 text-sm text-gray-600">
              {repo.description}
            </p>
          )}
        </div>

        {repo.private && (
          <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            Private
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
        {repo.language && (
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
            {repo.language}
          </span>
        )}
        <span>Stars {repo.stargazers_count}</span>
        <span>Forks {repo.forks_count}</span>
        <span>Updated {updatedLabel}</span>
      </div>
    </div>
  );
}
