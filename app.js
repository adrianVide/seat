class MenuItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const name = this.getAttribute('name');
        const link = this.getAttribute('link');
        this.innerHTML = `<a href=${link} class="menu__item">${name}</a>`;
    }
}

customElements.define('menu-item', MenuItem);

class Button extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');
        const arrow = this.hasAttribute('arrow') ? ' -->' : '';
        const bgAccent = this.hasAttribute('bgAccent');
        const outlined = this.hasAttribute('outlined');
        const classString = `${bgAccent ? ' button--bgaccent' : ''}${outlined ? ' button--outlined' : ''}`;
        this.innerHTML = `<button class="button${classString}">${name}${arrow}</button>`;
    }
}

customElements.define('button-item', Button);

class H1 extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');

        this.innerHTML = `<h1>${name}</h1>`;
    }
}

customElements.define('h1-text', H1);

class H2 extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');

        this.innerHTML = `<h2>${name}</h2>`;
    }
}

customElements.define('h2-text', H2);

class H3 extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');

        this.innerHTML = `<h3>${name}</h3>`;
    }
}

customElements.define('h3-text', H3);

class Paragraph extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');

        this.innerHTML = `<p>${name}</p>`;
    }
}

customElements.define('p-text', Paragraph);


class Insight extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const title = this.getAttribute('title');
        const amount = this.getAttribute('amount');
        this.innerHTML = `
        <p class="insight__title">${title}</p>
        <h3 class="insight__amount">${amount}</h3>
       `;
    }
}

customElements.define('insight-item', Insight);

class Message extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const text = this.getAttribute('text');
        const name = this.getAttribute('name');
        const time = this.getAttribute('time');
        const avatar = this.getAttribute('avatar');
        const isUser = this.hasAttribute('isUser');
        const render = isUser ? `<div class="message__text">${text}</div>
        <img class="message__avatar" src="${avatar}" alt="avatar">
        <div class="message__nameTimestamp">${name}, ${time}</div>
        <div class="grid-item"></div>` : ` <img class="message__avatar" src="${avatar}" alt="avatar">
        <div class="message__text">${text}</div>
        <div class="grid-item"></div>
        <div class="message__nameTimestamp">${name}, ${time}</div>`;
        this.innerHTML = render;
    }
}

customElements.define('message-item', Message);


class Plan extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const name = this.getAttribute('name');
        const tag = this.getAttribute('tag');
        const price = this.getAttribute('price');
        const features = JSON.parse(this.getAttribute('features') || '[]');
        const featuresHTML = features.map(feature => `<li>${feature}</li>`).join('');
        const disabledFeatures = JSON.parse(this.getAttribute('disabledFeatures') || '[]');
        const disabledFeaturesHTML = disabledFeatures.map(feature => `<li>${feature}</li>`).join('');

        this.innerHTML = `
        <div class="plan__name">${name}</div>
        <div class="plan__price">${price}</div>
        <div class="plan__tag">${tag}</div>
        <button-item class="plan__button" name="Get Started" outlined></button-item>
        <img class="plan__card" src="./assets/Credit Card.svg" alt="card" />
        <ul>${featuresHTML}</ul>
        <ul class="plan__features--disabled">${disabledFeaturesHTML}</ul>`;
    }
}

customElements.define('plan-item', Plan);

class HeadTag extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const firstHalf = this.getAttribute('firstHalf');
        const secondHalf = this.getAttribute('secondHalf');
        const tag = this.getAttribute('tag');


        this.innerHTML = `<div class="head-tag">
        <h3-text name="${firstHalf}<span class=&quot;title__half&quot;>${secondHalf}</span>"></h3-text>
        <p-text name="${tag}"></p-text></div>`;
    }
}

customElements.define('head-tag-item', HeadTag);

class FAQ extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const summary = this.getAttribute('summary');
        const details = this.getAttribute('details');

        this.innerHTML = `
        <details><summary>${summary}</summary>${details}</details>`;
    }
}

customElements.define('faq-item', FAQ);

class CovidChart extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
            const data = await response.json();
            const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
            const positiveIncreases = data.slice(0, 7).map(item => item.positiveIncrease);
            const deathIncreases = data.slice(0, 7).map(item => item.deathIncrease);

            const maxPositiveIncrease = Math.max(...positiveIncreases);
            const maxDeathIncrease = Math.max(...deathIncreases);

            const rows = this.querySelectorAll('tr');

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                cells[0].style.setProperty('--size', positiveIncreases[i - 1] / maxPositiveIncrease);
                cells[1].style.setProperty('--size', deathIncreases[i - 1] / maxDeathIncrease);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        this.innerHTML = `
            <table id="covidChart" class="charts-css column show-labels datasets-spacing-3">
                <tbody>
                    <tr>
                        <th scope="row">MON</th>
                        <td ></td>
                        <td ></td>
                    </tr>
                    <tr>
                        <th scope="row">TUE</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">WED</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">THU</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">FRI</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">SAT</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">SUN</th>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}

customElements.define('covid-chart', CovidChart);

class PlanSlider extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

        <div class="slider-container">
          <div class="slider">
            <plan-item class="plan" name="FREE" price="$0/m"
                tag="Manage your business with a simple and efficient account"
                features='["10 free local transfer", "10 free local transfer", "Multi-user access", "Prepaid debit cards", "Virtual cards"]'
                disabledFeatures='["Priority 24/7 support", "Exchange 24 currencies", "Free payment to other Draft accounts"]'></plan-item>
            <plan-item class="plan" name="PREMIUM" price="$8/m"
                tag="Priority support and multi-user access to maximize your productivity."
                features='["10 free local transfer", "10 free local transfer", "Multi-user access", "Prepaid debit cards", "Virtual cards", "Priority 24/7 support", "Exchange 24 currencies", "Free payment to other Draft accounts"]'></plan-item>
            <plan-item class="plan" name="PRO" price="$0/m"
                tag="Even better support and added functionality for teams."
                features='["10 free local transfer", "10 free local transfer", "Multi-user access", "Prepaid debit cards", "Virtual cards"]'
                disabledFeatures='["Priority 24/7 support", "Exchange 24 currencies", "Free payment to other Draft accounts"]'></plan-item>
            <plan-item class="plan" name="SUPER PRO" price="$8/m"
                tag="Even better, can you believe it?."
                features='["10 free local transfer", "10 free local transfer", "Multi-user access", "Prepaid debit cards", "Virtual cards", "Priority 24/7 support", "Exchange 24 currencies", "Free payment to other Draft accounts"]'></plan-item>
            <plan-item class="plan" name="ENTERPRISE" price="$8/m"
                tag="You are not supposed to get here."
                features='["10 free local transfer", "10 free local transfer", "Multi-user access", "Prepaid debit cards", "Virtual cards", "Priority 24/7 support", "Exchange 24 currencies", "Free payment to other Draft accounts"]'></plan-item>
          </div>
          <button class="prev" onclick="this.parentNode.querySelector('.slider').moveSlider(-1)">❮</button>
          <button class="next" onclick="this.parentNode.querySelector('.slider').moveSlider(1)">❯</button>
        </div>
      `;
      const prevButton = this.querySelector('.prev');
      const nextButton = this.querySelector('.next');
      const slider = this.querySelector('.slider');

      let slideIndex = 0;

      function moveSlider(n) {
        const plans = slider.querySelectorAll('.plan');
        const planWidth = plans[0].offsetWidth + parseInt(getComputedStyle(plans[0]).marginRight);
        const maxIndex = plans.length - Math.floor(slider.parentElement.offsetWidth / planWidth);

        slideIndex += n;
        slideIndex = Math.max(0, Math.min(slideIndex, maxIndex));

        slider.style.transform = `translateX(-${slideIndex * planWidth}px)`;
      }

      prevButton.addEventListener('click', () => moveSlider(-1));
      nextButton.addEventListener('click', () => moveSlider(1));
    }
  }

  customElements.define('plan-slider', PlanSlider);