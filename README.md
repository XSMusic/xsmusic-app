# XSMusic

Repositorio de la PWA/APP de XSMusic realizada en **Angular - Tailwind - Capacitor**

#### Notas

Cada vez que se añada un valor en el archivo .env, hay que añadir el archivo completo al secreto ENV de Github [aqui](https://github.com/josexs/xsmusic-app/settings/secrets/actions)

#### Mejoras

- [ ] Obtener la fecha de nacimiento de busqueda en google (birthdate of XXX)
- [ ] Confirmacion en eliminar
- [x] Track: Al crear asignar sitio desconocido
- [ ] Mapas
  - [x] Componente para mapa
        Opciones: Leatflet openstreetmap
  - [x] Conversor de coordenadas en direccion
  - [x] Conversor de direccion en coordenadas
  - [ ] Añadir arrastrar y devolver coordenadas (opcional)
  - [x] Obtener localizacion del usuario
- [ ] Imagenes
  - [ ] Crear ruta
  - [ ] Guardar imagenes
    - [ ] Eliminar image de los modelos
    - [ ] Al guardar cualquier modelo que contenga image, se comprueba si es diferente a cualquiera de los dos dominios (dev y prod) y si es asi, se subiria la imagen
- [ ] Buscador de nombres en redes sociales

#### Bugs

- [ ] Corregir modal en version movil (con texto grande no salen botones)
- [ ] Al guardar media, añadir validaciones de site
