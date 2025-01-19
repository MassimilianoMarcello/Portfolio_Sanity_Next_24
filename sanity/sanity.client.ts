// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';  // Importa imageUrlBuilder

const config: ClientConfig = {
    projectId: 'qpv8frw8',
    dataset: 'production',
    apiVersion: '2023-07-16',
    useCdn: false,
};

const client = createClient(config);

// Crea il builder per generare gli URL delle immagini
const builder = imageUrlBuilder(client);

// Funzione che restituirà l'URL ottimizzato per l'immagine
export const urlFor = (source: any) => builder.image(source);  // Puoi anche aggiungere altre manipolazioni dell'immagine come .width(), .height(), ecc.

export const apiVersion = config.apiVersion;
export const dataset = config.dataset;
export const projectId = config.projectId;

export default client;
