import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to MatLab Users Explorer</h1>
      <button
        onClick={() => navigate('/users')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Go to Users Page
      </button>
    </div>
  );
};

export default HomePage;
