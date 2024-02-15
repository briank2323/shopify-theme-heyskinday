const cachedFiltersResult=[];class CollectionFiltersForm extends HTMLElement{constructor(){super(),this.selectors={section:".facest-filters-section",productGridContainer:"#CollectionProductGrid",filtersForm:"#CollectionFiltersForm",sortingInToolbar:"[data-toolbar-sorting] select",sortingInForm:"[data-form-sorting] select",initialActiveSortingOption:".m-sortby-mobile--content li.active",filtersWrapper:".m-filter--wrapper",sidebar:".m-sidebar",sidebarContent:".m-sidebar--content",openSidebar:".m-sidebar--open",closeSidebar:".m-sidebar--close"},this.accordions=""}connectedCallback(){this.domNodes=queryDomNodes(this.selectors),this.setData(),this.debouncedOnSubmit=debounce((t=>this.onSubmitHandler(t)),500),this.domNodes.filtersForm.addEventListener("input",this.debouncedOnSubmit.bind(this)),this.setLoadingTarget(),this.initSorting(),window.addEventListener("popstate",this.onHistoryChange)}disconnectedCallback(){window.removeEventListener("popstate",this.onHistoryChange),this.listeners.forEach((t=>t()))}setData=()=>{const{section:t,initialActiveSortingOption:e}=this.domNodes;this.enableSorting="true"===t.dataset.enableSorting,this.filtersPosition=t.dataset.filtersPosition,this.sectionId=t.dataset.sectionId,this.activeSortingOption=e,this.view=t.dataset.view,this.listeners=[]};initSorting=()=>{const{sortingInToolbar:t}=this.domNodes;this.enableSorting&&t&&(t.selectedIndex=t.querySelector("option[selected]").dataset.index,t.addEventListener("change",(()=>{this.handleSorting(t.selectedIndex)})),this.listeners=[addEventDelegate({selector:".m-sortby-mobile--content li",handler:(t,e)=>{e!==this.activeSortingOption&&(this.activeSortingOption?.classList?.remove?.("active"),e.classList.add("active"),this.activeSortingOption=e,MinimogTheme.Collection.closeMobileSorting(),this.handleSorting(e.dataset.index))}})])};handleSorting=t=>{const{filtersForm:e,sortingInForm:i}=this.domNodes;i.selectedIndex=Number(t)||0,e.dispatchEvent(new Event("input"))};setLoadingTarget=()=>{const t=window.innerWidth<768?"mobile":"desktop",{productGridContainer:e}=this.domNodes,i="mobile"===t||"fixed"===this.filtersPosition?{}:{overlay:e};this.loading=new MinimogLibs.AnimateLoading(document.body,i)};onSubmitHandler(t){t.preventDefault();const e=new FormData(this.domNodes.filtersForm),i=new URLSearchParams(e).toString();this.renderPage(i)}onHistoryChange=t=>{const e=t.state?.searchParams||"";this.renderPage(e,!1)};renderPage=(t,e=!0)=>{this.loading.start();const i=`${window.location.pathname}?section_id=${this.sectionId}&${t}`;(cachedFiltersResult.find((({url:t})=>t===i))?this.renderSectionFromCache:this.renderSectionFromFetch)(i).then((()=>{MinimogTheme.Collection.init(),this.loading.finish(this.scrollToTop)})).catch(console.error),e&&this.updateURLHash(t)};renderSectionFromFetch=t=>fetch(t).then((t=>{if(t.ok)return t.text();throw new Error("Failed to load section!")})).then((e=>{cachedFiltersResult.push({url:t,html:e}),this.renderProductGrid(e)})).catch(console.error);renderSectionFromCache=async t=>{const e=cachedFiltersResult.find((({url:e})=>e===t));this.renderProductGrid(e.html)};renderProductGrid=t=>{const e=(new DOMParser).parseFromString(t,"text/html").querySelector(".facest-filters-section");this.domNodes.section.replaceWith(e)};updateURLHash(t){history.pushState({searchParams:t},"",`${window.location.pathname}${t&&"?".concat(t)}`)}scrollToTop=()=>{const t=document.getElementById("CollectionProductGrid");MinimogTheme.scrollIntoView(t,{align:{topOffset:80}})}}customElements.define("collection-filters-form",CollectionFiltersForm);