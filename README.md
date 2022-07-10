# About Project

Là một project RESTFULL API, cung cấp các api cơ bản cho một trang blog cá nhân

## API

\*\* phải xác thực bằng Bear token

- register - /api/v1/auth/register
  -{
  "name": <USERNAME>,
  "email": <EMAIL>,
  "password": <PASSWORD>
  }
- login
  -/api/v1/auth/login
  -{
  "email": <USERNAME>,
  "password": <PASSWORD>
  }
- category
  - create \*\*
    -/api/v1/blogs/category
    -{
    "name": "News"
    }
  - get
    -/api/v1/blogs/posts?limit=3&sort=desc
- post
  - create \*\*
    - /api/v1/blogs/post
      -{
      "title": "zenigame",
      "description": "zenigame is a water pokemon",
      "url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvn.portal-pokemon.com%2Fplay%2Fpokedex%2F007&psig=AOvVaw2BgUGetswYRHaR86lfIFf6&ust=1653479742524000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiIzZiK-PcCFQAAAAAdAAAAABAJ",
      "content": "Zenigame, còn gọi là Pokémon Rùa tí hon, là những Pokémon rùa có đôi mắt to và má phúng phính, có thể di chuyển bằng hai chân hoặc bằng bốn chân. Da của chúng màu xanh nhạt và sở hữu một cái đuôi dài và cong",
      "category":"Lửa"
      }
  - get
    -/api/v1/blogs/posts
  - get have limit and sort by
    - /api/v1/blogs/posts?limit=3&sort=desc
  - get posts by category
    - /api/v1/blogs/posts/category/:category
  - get by id /api/v1/blogs/post/:id
    - GET:
    - DELETE: \*\*
    - PATCH: \*\*
  - search
    - /api/v1/blogs/search
