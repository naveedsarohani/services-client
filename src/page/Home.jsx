import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/app/SearchBar";
import { fetchServices, connectService, disconnectService } from "../features/servicesSlice";
import details from "../assets/details.json";
import Card from "../components/app/Card";

const Home = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);
  const [search, setSearch] = useState("");

  // Only fetch once on mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleConnectDisconnect = (service, isConnected) => {
    if (isConnected) dispatch(disconnectService({ service }));
    else dispatch(connectService({ service }));
  };

  return (
    <div className="p-6">
      <div className="container-box">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold">Data Source Integrations</h2>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((item) => (
            <Card
              key={item.name}
              icon={details[item.name]?.icon}
              name={item.name}
              status={item.is_connected ? "connected" : "disconnected"}
              description={details[item.name]?.description}
              checked={item.is_connected}
              onChange={() => handleConnectDisconnect(item.name, item.is_connected)}
              isLoading={loading === item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;