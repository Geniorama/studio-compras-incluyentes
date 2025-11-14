## Resumen

`studio-compras-incluyentes` es un Sanity Content Studio que centraliza la administración de empresas, usuarios, productos, servicios y mensajes para la plataforma Compras Incluyentes. El estudio se conecta al proyecto Sanity `rr3ptdu1` (dataset `production`) y expone modelos de contenido personalizados para garantizar control sobre la información y sus flujos de aprobación.

## Arquitectura y componentes

1. **Sanity v3**: motor principal del CMS y del builder de esquemas (`sanity.config.ts`).
2. **Sanity Studio**: interfaz React generada automáticamente por Sanity para gestionar documentos.
3. **Plugins**:
   1. `structureTool`: organiza el árbol de contenido.
   2. `visionTool`: permite ejecutar queries GROQ directamente en el estudio.
4. **Stack de soporte**:
   1. `React 18` y `react-dom`: base de la UI del Studio.
   2. `styled-components`: disponible para personalizaciones de interfaz.
   3. Tooling: `TypeScript`, `ESLint`, `Prettier`.

El build estático del Studio se genera con `sanity build` y puede desplegarse mediante `sanity deploy`, lo que produce un frontend hospedado por Sanity o exportable para CDN propia.

## Estructura del repositorio

```
sanity.config.ts        # Configuración global del Studio (ID, dataset, plugins)
schemaTypes/            # Definiciones de documentos y objetos de contenido
  ├── companyType.ts
  ├── userType.ts
  ├── productType.ts
  ├── serviceType.ts
  ├── messageType.ts
  └── categoryType.ts
sanity.cli.ts           # Soporte para comandos CLI (se usa implícitamente)
dist/                   # Build estático generado por Sanity
```

## Requisitos y configuración local

1. **Prerequisitos**  
   1. Node.js 18+  
   2. Cuenta en Sanity con acceso al proyecto `rr3ptdu1`
2. **Instalación**  
   ```bash
   npm install
   ```
3. **Variables de entorno**  
   El Studio usa la configuración embebida (projectId/dataset) y no requiere `.env`. Para entornos adicionales, edita `sanity.config.ts`.
4. **Scripts npm**  
   - `npm run dev`: abre el Studio en modo desarrollo (`http://localhost:3333`).  
   - `npm run build`: genera el bundle estático en `dist/`.  
   - `npm run deploy`: publica el Studio en Sanity Hosting.  
   - `npm run deploy-graphql`: despliega el endpoint GraphQL si se habilitó en la cuenta (`sanity graphql deploy`).  

## Modelado de contenido

Todos los esquemas se registran en `schemaTypes/index.ts`. A continuación se detalla cada documento:

### `company`

| Campo | Tipo | Detalles |
| --- | --- | --- |
| `nameCompany`, `businessName` | string | Requeridos, identifican la marca y la razón social. |
| `typeDocumentCompany`, `numDocumentCompany` | string | Datos legales, incluyen selector NIT/CC/CE. |
| `ciiu` | string | Código de actividad económica. |
| `webSite` y redes (`facebook`, `instagram`, etc.) | url | Validación de URL. |
| `addressCompany`, `department`, `city` | string | Ubicación física. |
| `logo` | image | Requiere hotspot; fundamental para vistas previas. |
| `companySize`, `peopleGroup`, `otherPeopleGroup` | string | Clasificación de tamaño y grupos poblacionales; `otherPeopleGroup` solo visible cuando se elige “otro”. |
| `active`, `friendlyBizz`, `membership` | boolean | Controlan activación, certificaciones y estado de membresía (readOnly). |
| `annualRevenue` | number | Métrica financiera opcional. |
| `createdAt`, `updatedAt` | datetime | Uso interno (readOnly). |

### `user`

| Campo | Tipo | Detalles |
| --- | --- | --- |
| `company` | reference(`company`) | Usuario siempre asociado a una empresa. |
| `firstName`, `lastName`, `position` | string | Datos personales obligatorios. |
| `email`, `phone` | string | `email` valida formato; ambos requeridos. |
| `typeDocument`, `numDocument` | string | Control de identidad (CC/CE). |
| `photo` | image | Opcional, hotspot habilitado. |
| `firebaseUid` | string | Lectura, pensado para sincronizar con autenticación externa. |
| `role` | string | `admin` o `user`. |
| `createdAt`, `updatedAt` | datetime | Auditoría. |
| `dataTreatmentConsent`, `infoVisibilityConsent` | boolean | Deben ser `true`, se valida con regla personalizada. |

### `product`

| Campo | Tipo | Detalles |
| --- | --- | --- |
| `company` | reference(`company`) | Dueño del producto. |
| `name`, `description` | string/text | Nombre requerido. |
| `category` | array(reference(`category`)) | Mínimo un elemento. |
| `price` | number | Opcional para referencias. |
| `status` | string | `draft`/`active`/`inactive`. |
| `images` | array(image) | Debe contener al menos una imagen. |
| `sku` | string | Identificador libre. |
| `createdBy`, `updatedBy` | reference(`user`) | Campos de auditoría, solo lectura. |

### `service`

Similar a `product`, pero añade:

1. `duration`: string (duración estimada).
2. `modality`: presencial/virtual/híbrido.
3. `availability`: información libre sobre agenda.

### `category`

| Campo | Tipo | Detalles |
| --- | --- | --- |
| `name`, `description` | string/text | Requeridos. |
| `image` | image | Requerida, hotspot. |
| `types` | array(string) | Define si la categoría aplica a productos, servicios o ambos. |
| `slug` | slug | Se genera desde `name` (máx 96). |
| `createdAt`, `updatedAt` | datetime | Lectura. |

### `message`

| Campo | Tipo | Detalles |
| --- | --- | --- |
| `subject`, `content` | string/text | Requeridos. |
| `sender` | reference(`user`) | Usuario que origina el mensaje. |
| `senderCompany`, `recipientCompany` | reference(`company`) | Permite mensajes entre empresas. |
| `createdAt` | datetime | Valor inicial `new Date()`. |
| `read`, `deleted` | boolean | Estados de seguimiento; `deleted` está oculto. |
| `type` | string | `company_message`, `notification`, `support`, `alert`. |
| **Ordenamiento** | Se expone un `orderings` por fecha descendente. |
| **Preview** | Muestra asunto o snippet y la ruta `empresa origen → empresa destino`. |

## Flujos operativos

1. **Desarrollo**: Ejecutar `npm run dev`, autenticar con una cuenta Sanity (si se solicita) y realizar cambios en el Studio. Los esquemas se recargan automáticamente.
2. **Build y despliegue**:  
   1. `npm run build` para validar que los esquemas compilan.  
   2. `npm run deploy` para publicar el Studio en Sanity Hosting, o copiar el contenido de `dist/` a la infraestructura propia.  
   3. Si se usa GraphQL sobre Sanity, `npm run deploy-graphql` debe correrse tras cambios en los esquemas.
3. **Control de versiones**: No hay configuraciones personalizadas de linting/husky; se recomienda ejecutar `npx eslint .` y `npx prettier --check .` antes de hacer commit.

## Consideraciones de seguridad y datos

1. Los campos `firebaseUid`, consentimientos y banderas de activación están pensados para integrarse con un backend externo (Firebase/Auth propio). Mantener sincronizados los estados `active`, `role` y `membership` para garantizar accesos coherentes.
2. Las referencias entre empresas, usuarios, productos y servicios permiten modelar ownership; cualquier eliminación deberá gestionarse con reglas GROQ o scripts de migración para evitar referencias huérfanas.
3. Para exponer el contenido públicamente se recomienda usar tokens de lectura con permisos de solo lectura y queries GROQ parametrizadas.

## Próximos pasos sugeridos

1. Documentar permisos y roles personalizados si se usa `sanity.config.ts` para añadir `defineConfig` con `form`/`document` actions custom.
2. Añadir pruebas de validación de datos (p.ej. `sanity check`) como parte de pipelines CI/CD.
3. Construir una guía funcional para el equipo editorial que complemente este documento técnico.


