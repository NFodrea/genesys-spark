const icons = [
  {
    iconNames: [
      'custom/add-column-after',
      'custom/add-column-before',
      'custom/add-row-after',
      'custom/add-row-before',
      'custom/binoculars-slash-regular',
      'custom/clipboard-list-slash-regular',
      'custom/carousel',
      'custom/co-browse',
      'custom/delete-column',
      'custom/delete-row',
      'custom/delete-table',
      'custom/file-pen-question',
      'custom/filter-notification',
      'custom/font-regular-highlight',
      'custom/gkn-logo',
      'custom/list-alphabetical-regular',
      'custom/list-roman-regular',
      'custom/one-button',
      'custom/person-running',
      'custom/quick-reply',
      'custom/three-button',
      'custom/wrap-text-inline',
      'custom/wrap-text-tight',
      'custom/wrap-text-top-bottom',
      'fa/00-solid',
      'fa/1-regular',
      'fa/alarm-clock-regular',
      'fa/alarm-snooze-regular',
      'fa/align-center-regular',
      'fa/align-justify-regular',
      'fa/align-left-regular',
      'fa/arrow-left-to-line-solid',
      'fa/align-right-regular',
      'fa/arrow-right-to-line-solid',
      'fa/arrow-down-wide-short-regular',
      'fa/arrow-turn-down-right-regular',
      'fa/arrows-rotate-solid',
      'fa/arrows-to-circle-regular',
      'fa/asterix-regular',
      'fa/award-solid',
      'fa/backward-step-regular',
      'fa/ban-regular',
      'fa/bell-on-regular',
      'fa/bell-slash-regular',
      'fa/binoculars-regular',
      'fa/bold-regular',
      'fa/book-regular',
      'fa/bookmark-regular',
      'fa/briefcase-regular',
      'fa/bullseye-regular',
      'fa/calculator-regular',
      'fa/calendar-days-regular',
      'fa/check-solid',
      'fa/circle-check-regular',
      'fa/circle-check-solid',
      'fa/circle-info-solid',
      'fa/circle-play-regular',
      'fa/circle-plus-solid',
      'fa/circle-xmark-regular',
      'fa/clipboard-list-regular',
      'fa/clock-nine-regular',
      'fa/clock-rotate-left-regular',
      'fa/code-branch-regular',
      'fa/code-regular',
      'fa/comment-dots-regular',
      'fa/comments-regular',
      'fa/credit-card-regular',
      'fa/crop-simple-regular',
      'fa/cube-regular',
      'fa/database-regular',
      'fa/diagram-nested-regular',
      'fa/diagram-project-gear-regular',
      'fa/diagram-project-regular',
      'fa/diamond-regular',
      'fa/display-regular',
      'fa/draw-circle-solid',
      'fa/eye-regular',
      'fa/eye-slash-regular',
      'fa/face-frown-regular',
      'fa/face-frown-solid',
      'fa/face-laugh-regular',
      'fa/face-laugh-solid',
      'fa/file-chart-pie-regular',
      'fa/file-exclamation-regular',
      'fa/file-zip-regular',
      'fa/film-solid',
      'fa/filter-solid',
      'fa/font-regular',
      'fa/forward-step-regular',
      'fa/function-regular',
      'fa/gears-regular',
      'fa/gem-regular',
      'fa/google',
      'fa/hand-pointer-regular',
      'fa/hashtag-regular',
      'fa/hexagon-exclamation-solid',
      'fa/highlighter-line-regular',
      'fa/hourglass-start-regular',
      'fa/indent-regular',
      'fa/infinity-regular',
      'fa/italic-regular',
      'fa/language-regular',
      'fa/laptop-slash-regular',
      'fa/life-ring-regular',
      'fa/link-horizontal-slash-regular',
      'fa/link-horizontal-solid',
      'fa/list-ol-regular',
      'fa/list-radio-clean-regular',
      'fa/list-radio-regular',
      'fa/list-regular',
      'fa/list-ul-regular',
      'fa/map-regular',
      'fa/map-solid',
      'fa/memo-circle-check-regular',
      'fa/message-bot-regular',
      'fa/message-regular',
      'fa/microchip-solid',
      'fa/microsoft',
      'fa/money-bill-regular',
      'fa/outdent-regular',
      'fa/pause-regular',
      'fa/pen-slash-regular',
      'fa/play-regular',
      'fa/puzzle-piece-regular',
      'fa/question-solid',
      'fa/ranking-star-regular',
      'fa/rectangle-list-regular',
      'fa/regular-display-slash',
      'fa/reply-regular',
      'fa/right-to-bracket-regular',
      'fa/road-regular',
      'fa/rocket-regular',
      'fa/route-regular',
      'fa/share-regular',
      'fa/shuffle-regular',
      'fa/sigma-regular',
      'fa/signs-post-regular',
      'fa/sitemap-regular',
      'fa/sliders-solid',
      'fa/stop-regular',
      'fa/square-dashed-regular',
      'fa/strikethrough-regular',
      'fa/subscript-regular',
      'fa/superscript-regular',
      'fa/table-columns-regular',
      'fa/table-cells-regular',
      'fa/text-size-regular',
      'fa/text-slash-regular',
      'fa/ticket-regular',
      'fa/triangle-exclamation-solid',
      'fa/underline-regular',
      'fa/user-group-solid',
      'fa/volume-regular',
      'fa/volume-xmark-regular',
      'fa/wand-magic-sparkles-regular',
      'fa/windows'
    ]
  }
];

function generateSection(iconNames) {
  let output = '';

  output += '<div class="icons-container">';
  iconNames.forEach(iconName => {
    output += `<div class="icon-example">
    <gux-icon icon-name="${iconName}" class="example" decorative="true"></gux-icon>
    <div class="icon-name">${iconName}</div>
  </div>`;
  });
  output += '</div>';

  return output;
}

function generateHTML() {
  return icons.reduce((acc, cv) => acc + generateSection(cv.iconNames), '');
}

exports.generateHTML = generateHTML;
