import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../components/app/Grid";
import SearchBar from "../components/app/SearchBar";
import {
  fetchServices,
  connectService,
  disconnectService,
} from "../features/servicesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { services, loadingServices } = useSelector((state) => state.services);
  const [search, setSearch] = useState("");

 
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);


  const handleToggle = (serviceName) => {
    const isConnected = services[serviceName]?.is_connected;
    if (isConnected) {
      dispatch(disconnectService(serviceName));
    } else {
      dispatch(connectService({ service: serviceName, config: {} }));
    }
  };

 
  const filtered = Object.entries(services)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .map(([name, data], index) => ({
      id: index + 1, 
      name,
      ...data,
    }));

  return (
    <div className="p-6">
      <div className="container-box">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold">Data Source Integrations</h2>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <Grid
          data={filtered}
          handleToggle={handleToggle}
          loadingServices={loadingServices}
        />
      </div>
    </div>
  );
};

export default Home;