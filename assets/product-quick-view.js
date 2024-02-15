const{MinimogThemeStyles,MinimogThemeScripts}=window;class QuickView{constructor(){this.modal=new MinimogTheme.Modal,this.isOpen=!1,addEventDelegate({selector:".m-product-quickview-button",handler:(e,t)=>{e.preventDefault(),this.target=t,this.toggleLoading(this.target,!0);const i=t.dataset.productHandle;i&&this.fetchHtml(i)}}),window.MinimogEvents.subscribe(MinimogTheme.pubSubEvents.cartUpdate,(()=>{this.modal&&MinimogTheme.ProductQuickView.close()}))}fetchHtml(e){loadAssetsNew([MinimogThemeStyles.product,MinimogThemeStyles.productInventory],"quick-view-assets"),fetchSection("product-quickview",{url:`${window.MinimogSettings.base_url}products/${e}`}).then((e=>{this.modalContent=e.querySelector(".m-product-quickview");const t=e.querySelector("product-model");this.mediaGallery=this.modalContent.querySelector("media-gallery"),loadAssetsNew([MinimogThemeScripts.productMedia,MinimogThemeScripts.variantsPicker,MinimogThemeScripts.productInventory],"variants-picker",(()=>{const e=this.modalContent.dataset.colorScheme;this.modal.appendChild(this.modalContent),this.modal.setWidth("960px"),this.modal.open(),this.modal.setSizes(`m-gradient ${e}`),this.toggleLoading(this.target,!1),this.isOpen=!0})),t&&loadAssetsNew([MinimogThemeScripts.productModel,"https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css"],"product-model-assets")})).catch(console.error)}close(e){this.modal.close(e),this.isOpen=!1}toggleLoading(e,t){t?e.classList.add("m-spinner-loading"):e.classList.remove("m-spinner-loading")}}MinimogTheme.ProductQuickView=new QuickView;