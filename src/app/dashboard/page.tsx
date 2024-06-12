"use client";
import { useAuthState } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { isLogin, loading, user, error } = useAuthState();
  return (
    <div>
      <section className="dashboard">
        {(() => {
          if (loading) return <p>Loading user info...</p>;
          if (error) return <p>Oops! something went wrong</p>;
          return (
            <>
              <h1 className="dashboard__title">Dashboard</h1>
              <h3 className="dashboard__sub__title">User</h3>
              <hr></hr>
              {isLogin && (
                <div className="dashboard_info">
                  <p>ID: {user && user.id}</p>
                  <p>Name: {user && user.name}</p>
                </div>
              )}
            </>
          );
        })()}
      </section>
    </div>
  );
}
