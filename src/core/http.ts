import axios from 'axios';
import { env } from '~config/env';

const http = axios.create({ baseURL: env.API_BASE_URL });

export default http;
