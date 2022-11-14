# XSMusic

Repositorio de la PWA/APP de XSMusic realizada en **Angular - Tailwind - Capacitor**

#### Notas

Cada vez que se añada un valor en el archivo .env, hay que añadir el archivo completo al secreto ENV de Github [aqui](https://github.com/josexs/xsmusic-app/settings/secrets/actions)

#### Mejoras

- [ ] Obtener la fecha de nacimiento de busqueda en google (birthdate of XXX)
- [ ] Confirmacion en eliminar
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
    - [x] Eliminar image de los modelos
    - [ ] Guardar imagen en modo temporal
      - Cuando creamos un artista o lo que sea, aun no tenemos el id ni el tipo, abria que crear un tipo temporal, y al crear el modelo, cambiar el id y el tipo a la imagen
    - [ ] Obtener imagenes de instagram
    - [ ] Confirmar al eliminar
    - [ ] Crear pagina listado
- [ ] Buscador de nombres en redes sociales

#### Bugs

- [ ] Corregir modal en version movil (con texto grande no salen botones)
- [ ] Al guardar media, añadir validaciones de site
- [ ] Arreglar scraping con la nueva forma de imagenes
