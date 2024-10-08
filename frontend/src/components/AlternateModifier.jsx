import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AlternateModifier.css";

const AlternateModifier = () => {
  const [components, setComponents] = useState([]);
  const location = useLocation();
  const selectedId = location.state.selectedId;
  const [selectedComponentIds, setSelectedComponentIds] = useState([]);
  const [alternateComponents, setAlternateComponents] = useState({});
  const [selectedAlternateComponentIds, setSelectedAlternateComponentIds] = useState({});
  const orderSize = location.state.orderSize;
  const [totalDelta, setTotalDelta] = useState(0);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const token = sessionStorage.getItem("jwtToken"); // Retrieve the token from sessionStorage

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/vehicles/config/${selectedId}/Y`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched components:", data); // Debugging statement
        setComponents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedId) {
      fetchComponents();
    } else {
      console.error("selectedId is not defined");
    }
  }, [selectedId, token]);

  const handleCheckboxChange = async (compId, checked) => {
    if (checked) {
      setSelectedComponentIds((prevIds) => [...prevIds, compId]);
      try {
        const response = await fetch(
          `http://localhost:8080/api/alternate-components/${selectedId}/${compId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch alternate components");
        }
        const data = await response.json();
        setAlternateComponents((prevState) => ({
          ...prevState,
          [compId]: data,
        }));
        setSelectedAlternateComponentIds((prevState) => ({
          ...prevState,
          [compId]: selectedAlternateComponentIds[compId] || "",
        }));
      } catch (error) {
        console.error("Error fetching alternate components:", error);
      }
    } else {
      setSelectedComponentIds((prevIds) => prevIds.filter((id) => id !== compId));
      setAlternateComponents((prevState) => {
        const newState = { ...prevState };
        delete newState[compId];
        return newState;
      });
      setSelectedAlternateComponentIds((prevState) => {
        const newState = { ...prevState };
        delete newState[compId];
        return newState;
      });
    }
  };

  const handleInvoiceClick = () => {
    const fetchAndSumDeltaPrices = async () => {
      try {
        const deltaPrices = await Promise.all(
          Object.values(selectedAlternateComponentIds).map(async (id) => {
            const response = await fetch(
              `http://localhost:8080/api/alternate-components/alt/${selectedId}/${id}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`, // Add Authorization header
                  "Content-Type": "application/json"
                }
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const deltaPrice = parseFloat(data.deltaPrice);
            return isNaN(deltaPrice) ? 0 : deltaPrice;
          })
        );

        const total = deltaPrices.reduce((a, b) => a + b, 0);
        setTotalDelta(total);
        navigateToInvoice(total);
      } catch (error) {
        console.log("Fetch failed", error);
      }
    };

    const navigateToInvoice = (totalDelta) => {
      navigate("/InvoiceGenerator", {
        state: {
          nonCheckedComponentIds: components
            .filter((component) => !selectedComponentIds.includes(component.comp_id))
            .map((component) => component.comp_id),
          selectedDropdownIds: Object.values(selectedAlternateComponentIds),
          selectedId: selectedId,
          orderSize: orderSize,
          totalDeltaa: totalDelta,
        },
      });
    };

    fetchAndSumDeltaPrices();
  };

  const handleAlternateChange = (compId, selectedValue) => {
    setSelectedAlternateComponentIds((prevState) => ({
      ...prevState,
      [compId]: selectedValue,
    }));
  };

  const handleModifyClick = () => {
    navigate("/Configurations", {
      state: {
        selectedId: selectedId,
        orderSize: orderSize,
        selectedComponentIds: selectedComponentIds,
        selectedAlternateComponentIds: selectedAlternateComponentIds,
      },
    });
  };

  return (
    <>
      <center><h1>Components List</h1></center>
      <div className="data_disp">
        <ul>
          {components.map((component, index) => (
            <li key={index}>
              <div className="checkbox-wrapper-7" id="chec">
                <input
                  id={index}
                  className="custom-checkbox"
                  type="checkbox"
                  checked={selectedComponentIds.includes(component.comp_id)}
                  onChange={(e) => handleCheckboxChange(component.comp_id, e.target.checked)}
                />
                <label className="tgl-btn" htmlFor={index}></label>
              </div>
              <span className="compnamecheckbox" style={{ fontSize: "large" }}>{component.comp_name}</span>
              {selectedComponentIds.includes(component.comp_id) && (
                <select
                  value={selectedAlternateComponentIds[component.comp_id] || ""}
                  onChange={(e) => handleAlternateChange(component.comp_id, e.target.value)}
                  disabled={!selectedComponentIds.includes(component.comp_id)}
                  className="dropdwn"
                >
                  <option value="">Select Alternate Component</option>
                  {alternateComponents[component.comp_id] &&
                    alternateComponents[component.comp_id].map((alternateComponent, index) => (
                      <option key={index} value={alternateComponent.id}>
                        {alternateComponent.comp_name} (Delta Price: {alternateComponent.delta_price})
                      </option>
                    ))}
                </select>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="two_btn">
        <button onClick={handleInvoiceClick}>Confirm</button>
        <button onClick={handleModifyClick} style={{ marginLeft: "20px" }}>Cancel</button>
      </div>
    </>
  );
};

export default AlternateModifier;
