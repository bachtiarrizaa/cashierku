import Navbar from "../Components/Navbar";
import Sidebar from "../Components/SideBar";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        <aside className="h-full bg-white">
          <Sidebar />
        </aside>

        <main className="flex-1 h-full overflow-y-auto px-6 pt-4 pb-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}