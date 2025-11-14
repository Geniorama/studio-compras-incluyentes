## Propósito

La guía funcional describe cómo operar el Studio Sanity de Compras Incluyentes (`studio-compras-incluyentes`) para registrar y mantener información de empresas, usuarios, productos, servicios, categorías y mensajes. Está dirigida a equipos de contenido, comerciales y soporte que trabajan dentro del Studio sin necesidad de modificar código.

## Roles y permisos

1. **Administrador**  
   - Accede a todos los documentos.  
   - Puede crear/editar empresas, usuarios y catálogos completos.  
   - Gestiona activación de empresas y sincroniza datos con sistemas externos (p.ej. membresías).  
2. **Usuario**  
   - Acceso limitado (definido por políticas del proyecto Sanity).  
   - Generalmente se le permiten operaciones de lectura o edición parcial de productos/servicios propios.  
3. **Externos (solo lectura)**  
   - Se recomiendan tokens GROQ/GraphQL con permisos de lectura para equipos de BI o frontends públicos.

> Nota: los permisos exactos se configuran en Sanity Manage o mediante roles personalizados; coordinar con el administrador del proyecto RR3PTDU1.

## Navegación del Studio

1. **Panel lateral**: organizado por `structureTool`, agrupa documentos por módulo (Empresas, Usuarios, Catálogo, Mensajes, Categorías).  
2. **Panel central**: lista de documentos filtrable por estado, búsqueda y ordenación.  
3. **Panel de edición**: formulario con validaciones en tiempo real, historial y preview.  
4. **Vision**: herramienta para ejecutar consultas GROQ y validar datos (botón “Vision” en la barra superior).

## Flujos principales

### 1. Registro y activación de empresas

1. Ir a `Empresas` → “Create new”.  
2. Completar datos legales (`nameCompany`, `businessName`, documento, CIIU).  
3. Añadir información de contacto (web, redes, dirección).  
4. Seleccionar `companySize` y `peopleGroup`; si se elige “Otro”, completar `otherPeopleGroup`.  
5. Cargar el `logo` (recomendado 512x512).  
6. Guardar el documento.  
7. Revisar indicadores de certificaciones (`friendlyBizz`) y `membership`.  
8. Cambiar `active` a true únicamente cuando la empresa esté verificada; esto habilita el acceso de sus usuarios.

### 2. Creación de usuarios asociados

1. Navegar a `Usuarios` → “Create new”.  
2. Seleccionar la `company` relacionada (solo empresas activas).  
3. Completar nombre, apellidos, cargo y datos de contacto.  
4. Registrar documento personal (`typeDocument`, `numDocument`).  
5. Definir `role` (`Administrador` para responsables internos, `Usuario` para miembros estándar).  
6. Subir foto opcional.  
7. Asegurarse de que ambos consentimientos (`dataTreatmentConsent`, `infoVisibilityConsent`) estén marcados.  
8. Guardar; los campos `firebaseUid`, `createdAt`, `updatedAt` se actualizan mediante integraciones externas o scripts.

### 3. Gestión del catálogo (productos y servicios)

1. **Producto nuevo**  
   1. Abrir `Productos` → “Create new”.  
   2. Elegir `company` y al menos una `category`.  
   3. Completar `name`, descripción y precios si aplica.  
   4. Subir imágenes múltiples (mínimo una) y definir `status` (`draft` hasta completar revisión).  
   5. Guardar; los campos `createdBy`/`updatedBy` se llenan automáticamente cuando existe flujo de autenticación con Sanity.  
2. **Servicio nuevo**  
   1. Igual que producto, pero agregar `duration`, `modality` y `availability`.  
   2. Usar `status=active` solo cuando la oferta esté lista para publicarse.  
3. **Actualización masiva**  
   - Filtrar por `status` en la lista, seleccionar elementos y utilizar acciones de lote (duplicar, archivar, etc.).  
   - Para cambios globales (p.ej. subir precios 10%), ejecutar scripts GROQ/CLI o contactar al equipo técnico.

### 4. Administración de categorías

1. Ir a `Categorías` y crear una nueva con `name`, `description`, imagen y `types` (producto, servicio o ambos).  
2. Revisar el `slug` autogenerado; editar si se requiere URL amigable.  
3. Despublicar categorías no utilizadas únicamente después de reasignar todas las referencias (para evitar errores en frontend).

### 5. Mensajería entre empresas

1. Abrir `Mensajes` → “Create new”.  
2. Ingresar `subject` y `content`.  
3. Seleccionar `senderCompany`, `recipientCompany` y opcionalmente el `sender` (usuario que envía).  
4. Establecer `type`:  
   - `company_message`: intercambio comercial directo.  
   - `notification`: alertas generales.  
   - `support`: contacto de soporte.  
   - `alert`: avisos críticos.  
5. Guardar; el Studio genera `createdAt`, `read=false`, `deleted=false`.  
6. Para marcar como leído, editar el documento y activar `read`.  
7. El campo `deleted` está oculto; solo se manipula mediante scripts para archivado lógico.

## Buenas prácticas operativas

1. **Versionado**: documentar los cambios relevantes (quién creó o actualizó un documento) usando comentarios en Sanity o registros externos.  
2. **Estados**: usar `status=draft` para contenido en revisión; cambiar a `active` únicamente tras QA.  
3. **Consistencia de datos**: mantener formatos estándar (p.ej. SKU alfanumérico, precios con unidad monetaria definida en la descripción).  
4. **Medios**: optimizar imágenes antes de subirlas (peso < 1 MB) para mejorar tiempos de carga.  
5. **Backups**: Sanity mantiene versiones, pero se recomienda exportar snapshots (`sanity dataset export`) antes de migraciones masivas.  
6. **Vision Tool**: ejecutar consultas GROQ de verificación (ej. productos sin categoría) de manera periódica.

## Checklists por rol

1. **Administrador**  
   - Revisar nuevas empresas pendientes y activar cuando cumplan requisitos.  
   - Auditar consentimientos y documentos actualizados de usuarios.  
   - Aprobar productos/servicios antes de publicar.  
   - Coordinar despliegues (`npm run deploy`) y monitorear logs.  
2. **Editor de catálogo**  
   - Mantener categorías alineadas con la oferta comercial.  
   - Actualizar stock e imágenes cuando se lancen campañas.  
   - Marcar servicios inactivos al terminar vigencias.  
3. **Soporte / Community**  
   - Gestionar mensajes (`read`/`unread`).  
   - Escalar alertas críticas a administradores.  
   - Mantener comunicación con empresas sobre visibilidad y membresías.

## Integraciones externas

1. **Autenticación (Firebase)**: el campo `firebaseUid` permite vincular usuarios del Studio con credenciales de Firebase/Auth propio; requiere scripts o webhooks que escriban el UID al crear el usuario.  
2. **Frontends públicos**: consumir los datos a través de GROQ/GraphQL usando tokens de solo lectura y filtros por `status='active'` y `active=true` en empresas.  
3. **Automatizaciones**:  
   - Webhooks de Sanity para avisar a servicios externos cuando se publica un producto/servicio.  
   - Pipelines CI para ejecutar `sanity check` y `sanity graphql deploy` tras cambios de esquema.

## Seguimiento y métricas

1. Usar Vision para contar documentos por estado (`count(*[ _type == "product" && status == "draft" ])`).  
2. Exportar datasets periódicamente para BI.  
3. Registrar KPIs básicos: número de empresas activas, usuarios con consentimientos completos, catálogo por categoría, volumen de mensajes.

## Próximos pasos recomendados

1. Definir un calendario de revisión editorial (semanal/mensual).  
2. Implementar roles personalizados en Sanity Manage acorde a los equipos reales.  
3. Documentar plantillas de contenido (p.ej. estructura estándar de descripciones de producto).  
4. Integrar notificaciones automáticas (email/Slack) cuando se creen mensajes tipo `alert` o se active una empresa nueva.


