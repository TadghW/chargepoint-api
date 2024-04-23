import { Pool, QueryResult } from 'pg';

interface User {
  id: number;
  name: string;
  email: string;
}

// Get simulations
export const getSimulations = async (pool: Pool): Promise<User | null> => {
  console.log("Getting stored simulation results...");
  const query = 'SELECT * FROM simulations';
  const result: QueryResult = await pool.query(query);
  return result.rows.length === 0 ? null : result.rows[0];
};

// Run a new simulation
export const runSimulation = async (pool: Pool, numChargepoints: number, chargePower: number, vehicleEfficiency: number, demandMultiplier: number): Promise<User> => {
  console.log("Running simulation...");
  const simulationResults = {totalEnergyConsumed: 10000, peakPowerDemand: 50, concurrencyFactor: 0.55}; //replace with call to simulation
  const query = 'INSERT INTO simulations (numchargepoints, chargepower, vehicleefficiency, demandmultiplier, totalenergyconsumed, peakpowerdemand, concurrencyfactor) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const result: QueryResult = await pool.query(query, [numChargepoints, chargePower, vehicleEfficiency, demandMultiplier, simulationResults.totalEnergyConsumed, simulationResults.peakPowerDemand, simulationResults.concurrencyFactor]);
  return result.rows[0];
};

// Update a simulation request and rerun the simulation
export const updateSimulation = async (pool: Pool, id: number, numChargepoints: number, chargePower: number, vehicleEfficiency: number, demandMultiplier: number): Promise<User | null> => {
  console.log("Running simulation...");
  const simulationResults = {totalEnergyConsumed: 10001, peakPowerDemand: 49, concurrencyFactor: 0.54}; //replace with call to simulation
  const query = 'UPDATE simulations SET numchargepoints = $1, chargepower = $2, vehicleefficiency = $3, demandmultiplier = $4, totalenergyconsumed = $5, peakpowerdemand = $6, concurrencyfactor = $7 WHERE id = $8 RETURNING *';
  const result: QueryResult = await pool.query(query, [numChargepoints, chargePower, vehicleEfficiency, demandMultiplier, simulationResults.totalEnergyConsumed, simulationResults.peakPowerDemand, simulationResults.concurrencyFactor, id]);
  return result.rows.length === 0 ? null : result.rows[0];
};

// Delete a simulation request and answer
export const deleteSimulation = async (pool: Pool, id: number): Promise<void> => {
  console.log("Deleting simulation record...");
  const query = 'DELETE FROM simulations WHERE id = $1';
  await pool.query(query, [id]);
};