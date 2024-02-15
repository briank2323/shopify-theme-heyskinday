if(!customElements.get("pcard-swatch")){class t extends HTMLElement{constructor(){super(),this.selectors={container:"[data-pcard-variant-picker]",optionNodes:[".m-product-option--node__label"],featuredImage:".m-product-card__main-image",pcard:".m-product-card",variantDropdown:".m-product-option--dropdown-select",priceWrapper:".m-price",salePrice:".m-price-item--sale",compareAtPrice:[".m-price-item--regular"],unitPrice:".m-price__unit",soldOutBadge:".m-product-tag--soldout"},this.container=this.closest(this.selectors.container),this.pcard=this.closest(this.selectors.pcard),this.variantIdNode=this.pcard&&this.pcard.querySelector('[name="id"]'),this.featuredImage=this.pcard&&this.pcard.querySelector(this.selectors.featuredImage),this.domNodes=queryDomNodes(this.selectors,this.pcard),this.setupData()}async setupData(){this.variantData=this.getVariantData(),this.productHandle=this.container.dataset.productHandle,this.productData=await this.getProductJson(),this.activeOptionNodeByPosition={},this.hide_unavailable_product_options=MinimogSettings.hide_unavailable_product_options;const{variantIdNode:t,productData:e,productData:{variants:a}={}}=this;if(e){let i=t&&Number(t.value);i||(i=e.selected_or_first_available_variant&&e.selected_or_first_available_variant.id);const s=a.find((t=>t.id===i))||a[0];this.productData.initialVariant=s,!this.productData.selected_variant&&t&&t.dataset.selectedVariant&&(this.productData.selected_variant=a.find((e=>e.id===Number(t&&t.dataset.selectedVariant)))),this.updateOptionByVariant(s),this.updateProductCardSoldOutBadge(s),window.MinimogEvents.subscribe("m:image-loaded",(()=>{this.changeProductImage(s)}))}this.initOptionSwatches(),this.domNodes.optionNodes&&this.domNodes.optionNodes.forEach((t=>t.addEventListener("click",this.handleSelectVariant.bind(this)))),this.domNodes.variantDropdown&&this.domNodes.variantDropdown.addEventListener("change",this.handleSelectVariant.bind(this))}getVariantData(){return this.variantData=this.variantData||JSON.parse(this.container&&this.container.querySelector('[type="application/json"]').textContent),this.variantData}getProductJson(){let t=`${window.MinimogSettings.routes.root}/products/${this.productHandle}.js`;return t=t.replace("//","/"),fetch(t).then((function(t){return t.json()}))}initOptionSwatches(){const{_colorSwatches:t=[],_imageSwatches:e=[]}=window.MinimogSettings;this.domNodes.optionNodes.forEach((a=>{const{optionType:i,optionPosition:s,value:o}=a&&a.dataset,n=o&&o.toLowerCase(),r=this.variantData.find((t=>t[`option${s}`]===o)),c=r&&r.featured_image&&r.featured_image.src?getSizedImageUrl(r.featured_image.src,"60x"):null,d=e.find((t=>t.key===n))&&e.find((t=>t.key===n)).value,l=t.find((t=>t.key===n))&&t.find((t=>t.key===n)).value;switch((c||d)&&a.classList.add("has-bg-img"),i){case"default":(d||c)&&(a.style.backgroundImage=`url(${d||c||""})`);break;case"image":(c||d)&&(a.style.backgroundImage=`url(${c||d||""})`);break;case"color":a.style.background=`${l||n}`,d&&(a.style.backgroundImage=`url(${d})`)}}))}toggleOptionNodeActive(t,e){if(t)if(e){const{optionPosition:e,value:a}=t.dataset;switch(this.activeOptionNodeByPosition[e]=t,t.tagName){case"INPUT":t.checked="checked",t.dataset.selected="true";break;case"OPTION":t.dataset.selected="true";const e=t.closest("select");e&&(e.value=t.value);break;case"LABEL":t.dataset.selected="true";break;default:t.classList.contains("m-product-quickview-button")}}else{["default","image","color"].includes(t.dataset.optionType)||(t.style.border=""),t.checked=!1,delete t.dataset.selected;const e=t.closest("select");e&&(e.value="")}}updateOptionByVariant(t){Object.values(this.activeOptionNodeByPosition).forEach((t=>this.toggleOptionNodeActive(t,!1)));const{optionNodes:e}=this.domNodes,{options:a=[]}=t||{};a.forEach(((t,a)=>{const i=a+1;e.forEach((e=>{const a=Number(e.dataset.optionPosition),s=e.dataset.value;a===i&&t===s&&this.toggleOptionNodeActive(e,!0)}))})),this.updatePrice(t)}getVariantFromActiveOptions=()=>{const{productData:t,productData:{initialVariant:e},activeOptionNodeByPosition:a}=this;let i;const s={1:e.option1,2:e.option2,3:e.option3};Object.values(a).forEach((t=>{const{optionPosition:e,value:a}=t.dataset;s[e]=a})),i=Object.values(s),i=i.filter(Boolean);let o=getVariantFromOptionArray(t,i);return!o&&this.hide_unavailable_product_options&&(i.pop(),o=getVariantFromOptionArray(t,i),o||(i.pop(),o=getVariantFromOptionArray(t,i))),this.currentVariant=o,o};handleSelectVariant(t){let e,{target:a}=t;if(a.classList.contains("combined-variant")){const a=Number(t.target.value);e=this.productData&&this.productData.variants&&this.productData.variants.find((t=>t.id===a))}else{"SELECT"===a.tagName&&(a=a.querySelectorAll("option")[a.selectedIndex]),a.classList.contains("m-product-option--node__label")||(a=a.closest(".m-product-option--node__label"));const{optionPosition:t}=a.dataset,i=this.activeOptionNodeByPosition[t];this.toggleOptionNodeActive(i,!1),this.toggleOptionNodeActive(a,!0),e=this.getVariantFromActiveOptions()}const{variantIdNode:i}=this;i&&(i.setAttribute("value",String(e.id)),i.value=String(e.id)),this.updateBySelectedVariant(e)}updateBySelectedVariant(t){t&&(this.changeProductImage(t),this.updatePrice(t),this.updateProductCardSoldOutBadge(t))}updateProductCardSoldOutBadge(t){this.domNodes.soldOutBadge&&(this.domNodes.soldOutBadge.style.display=t.available?"none":"flex")}changeProductImage(t){const e=t&&t.featured_image&&t.featured_image.src,{featuredImage:a}=this,i=a&&a.querySelector("img");i&&e&&(i.src=e,i.removeAttribute("srcset"))}updatePrice(t){if(MinimogSettings.pcard_show_lowest_prices)return;const e="m-price--on-sale",a="m-price--sold-out",i=window.MinimogSettings.money_format,{priceWrapper:s,salePrice:o,unitPrice:n,compareAtPrice:r}=this.domNodes,{compare_at_price:c,price:d,unit_price_measurement:l}=t,u=c&&c>d,p=!t.available;if(u?s&&s.classList.add(e):s&&s.classList.remove(e),p?s&&s.classList.add(a):s&&s.classList.remove(a),s&&s.classList.remove("visibility-hidden"),o&&(o.innerHTML=formatMoney(d,i)),r&&r.length&&c>d?r.forEach((t=>t.innerHTML=formatMoney(c,i))):r.forEach((t=>t.innerHTML=formatMoney(d,i))),l&&n&&this.currentVariant){n.classList.remove("f-hidden");const t=`<span>${formatMoney(this.currentVariant.unit_price,i)}</span>/<span data-unit-price-base-unit>${this._getBaseUnit()}</span>`;n.innerHTML=t}else n&&n.classList.add("f-hidden")}_getBaseUnit=()=>1===this.currentVariant.unit_price_measurement.reference_value?this.currentVariant.unit_price_measurement.reference_unit:this.currentVariant.unit_price_measurement.reference_value+this.currentVariant.unit_price_measurement.reference_unit}if(customElements.define("pcard-swatch",t),!customElements.get("swatch-button")){class t extends HTMLElement{constructor(){super()}}if(customElements.define("swatch-button",t),!customElements.get("swatch-dropdown")){class e extends t{constructor(){super()}}customElements.define("swatch-dropdown",e)}if(!customElements.get("swatch-image")){class e extends t{constructor(){super()}}customElements.define("swatch-image",e)}if(!customElements.get("swatch-color")){class e extends t{constructor(){super()}}customElements.define("swatch-color",e)}}}