import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`FlowPilot backend listening on http://localhost:${env.PORT}`);
});
