import express from 'express';
import RouterManagement from './Controller/RouterManagement';
import { setupSwagger } from  './config/swagger'

const api = express();

api.use(express.json());
api.disable('x-powered-by');
api.use(RouterManagement)
setupSwagger(api);

const PORT = process.env.PORT;

function start() {
    return api.listen(PORT,() => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
}

function stop(){
    console.log('Stopping server...');
    console.log('Server stopped successfully.');
    process.exit(0);
}

const Server = {
    start,
    stop   
};

export default Server;