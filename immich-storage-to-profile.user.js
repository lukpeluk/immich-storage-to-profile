// ==UserScript==
// @name         Immich storage indicator to profile menu
// @description  Moves the immich storage indicator to the profile menu, like it is in the mobile version.
// @match        https://<your-immich-instance>/*
// @match        https://demo.immich.app/*
// @version      1.0.1
// @author       Lukpeluk
// @namespace    lukpeluk
// @icon         https://immich.app/favicon.ico
// @homepageURL  https://github.com/lukpeluk/immich-storage-to-profile/issues
// @supportURL   https://github.com/lukpeluk/immich-storage-to-profile/issues
// @updateURL    https://raw.githubusercontent.com/lukpeluk/immich-storage-to-profile/main/immich-storage-to-profile.user.js
// @downloadURL  https://raw.githubusercontent.com/lukpeluk/immich-storage-to-profile/main/immich-storage-to-profile.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getOriginalStorage() {
        return document.querySelector('.storage-status:not(.vm-clone)');
    }

    function hideOriginal() {
        const original = getOriginalStorage();
        if (original) {
            original.style.display = 'none';
        }
    }

    function injectIntoMenu() {
        const original = getOriginalStorage();
        if (!original) return;

        const mainCard = document.querySelector(
            '.mx-4.mt-4.flex.flex-col.items-center.justify-center'
        );

        if (!mainCard) return;
        if (mainCard.querySelector('.vm-clone')) return;

        const clone = original.cloneNode(true);
        clone.classList.add('vm-clone');

        // change the colors and style a bit to better match the context
        clone.style.display = 'block';
        clone.className = 'storage-status vm-clone bg-gray-100 dark:bg-immich-dark-gray';
        clone.style.borderRadius = '12px';
        clone.style.padding = '10px 14px';
        clone.style.marginTop = '12px';
        clone.style.width = '100%';
        clone.style.boxSizing = 'border-box';
        clone.style.alignSelf = 'stretch';
        clone.style.marginLeft = '0';
        clone.style.marginRight = '0';

        mainCard.appendChild(clone);
    }

    const observer = new MutationObserver(() => {
        hideOriginal();
        injectIntoMenu();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();



