import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { pool } from './database';
import { getSimulations, runSimulation, updateSimulation, deleteSimulation } from './model';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Get simluations
app.get('/simulation', async (req: Request, res: Response) => {
  try {
    
    const simulations = await getSimulations(pool);
    
    if ( simulations ) {
      res.json(simulations);
    } else {
      res.status(404).json({ error: 'No simulations found. '});
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }

});

// Send simulation request
app.post('/simulation', async (req: Request, res: Response) => {

  const { numChargepoints, chargePower, vehicleEfficiency, demandMultiplier } = req.body;
  
  try {
  
    const newSimulation = await runSimulation(pool, numChargepoints, chargePower, vehicleEfficiency, demandMultiplier);
    res.json(newSimulation);
  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }

});

// Modify stored simulation request
app.put('/simulation', async (req: Request, res: Response) => {

  const { id, numChargepoints, chargePower, vehicleEfficiency, demandMultiplier } = req.body;
  
  try {
  
    const updatedSimulation = await updateSimulation(pool, parseInt(id), numChargepoints, chargePower, vehicleEfficiency, demandMultiplier);
    res.json(updatedSimulation);
  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }

});

// Delete request and result
app.delete('/simulation', async (req: Request, res: Response) => {
  
  const { id } = req.body;
  
  try {
  
    await deleteSimulation(pool, parseInt(id));
    res.json({ message: `Simluation {$id} deleted successfully` });
  
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});