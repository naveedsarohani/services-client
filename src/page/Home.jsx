import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../components/app/Grid";
import SearchBar from "../components/app/SearchBar";
import {
  fetchServices,
  connectService,
  disconnectService,
} from "../features/servicesSlice";
import { initialData } from "../components/data/initialData";

const Home = () => {
  const dispatch = useDispatch();
  const { services, loadingServices } = useSelector((state) => state.services);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const mergedData = initialData.map((item) => {
    const backend = services[item.name.toLowerCase()] || {};
    return {
      ...item,
      is_connected: backend.is_connected ?? false,
    };
  });

  const handleToggle = (serviceKey) => {
    const service = mergedData.find((s) => s.name.toLowerCase() === serviceKey);
    if (!service) return;

    if (service.is_connected) {
      dispatch(disconnectService({ service: serviceKey }));
    } else {
      dispatch(connectService({ service: serviceKey }));
    }
  };

  const filteredData = mergedData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="container-box">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-lg font-semibold">Data Source Integrations</h2>
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <Grid
          initialData={filteredData}
          handleToggle={handleToggle}
          loadingServices={loadingServices}
        />
      </div>
    </div>
  );
};

export default Home;