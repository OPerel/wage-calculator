import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
})
export class AppFooter {
  render() {
    return (
      <footer dir="ltr">
        <p>
          <a href="https://workers.org.il/" target="_blank" rel="noopener">
            Koach LaOvdim
          </a>
          &nbsp;
          <span>
            - Democratic Workers’ Organization &#169; {new Date().getFullYear()}
            ,
          </span>
          &nbsp;
          <span>Developed by</span>
          &nbsp;
          <a href="https://www.oriperelman.com/" target="_blank" rel="noopener">
            Ori Perelman
          </a>
        </p>
      </footer>
    );
  }
}
