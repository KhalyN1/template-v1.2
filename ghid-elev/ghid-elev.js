const container = document.querySelector('.articles');

fetch('http://localhost:5000/')
     .then(res => res.json())
     .then(articles =>
     {
        articles.forEach(article =>
          {
                let link = document.createElement('a');
                link.classList.add('article')
                link.href = article.url;
                let card = document.createElement('div');
                card.classList.add('article-card');
                let text = document.createElement('p');
                text.textContent = article.body;
                let image = document.createElement('img');
                image.src = article.img
                container.appendChild(link);
                link.appendChild(card);
                card.appendChild(text);
                card.appendChild(image);
            
          })

          document.querySelector('.article:first-child').classList.add('grid-col-2');
          document.querySelector('.article:first-child').classList.add('grid-row-2');
          document.querySelector('.article:nth-child(2)').classList.add('grid-col-2');

       })