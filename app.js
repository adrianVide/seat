class MenuItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<a class="menu__item">${this.getAttribute('name')}</a>`;
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
        <button-item  name="Get Started" outlined></button-item>
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