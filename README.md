# PCS Tooltip

Adds a tooltip to [ProCyclingStats.com][1] that loads rider information when hovering over their name. Useful when you
are following the live stats and want to know who is in the breakaway or when you are scanning the results list.

Not affilliated with ProCyclingStats.

![image](https://user-images.githubusercontent.com/170034/111041326-0319f580-8438-11eb-8ed8-389a834362ba.png)

## Installation instructions
This extension is not published on the Chrome extension store. Download the latest version from the [Releases tab][3]. Go
to your Chrome settings and click 'Extensions' in the sidebar. Enable 'developer mode' in the top right, then drag and
drop the zip file you just downloaded into the screen. You should now have a new extension installed called 'ProCyclingStats
Rider Tooltip'. You need to reload the PCS website after installing the extension for it to become active.

## Development
* `yarn install`.
* `yarn watch` to (re)build the javascript automatically when making changes.
* Load the `dist/` directory as an [unpacked extension][2] in Chrome.
* `yarn lint` to lint your JS.

## Contributing
1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Releasing
1. Update version number in `package.json` and `dist/manifest.json`.
2. Commit and tag a new release (`git tag v0.x`)
3. `yarn build`.
4. `zip -j -r chrome-pcs-tooltip.zip dist/*`.
5. Push tag to Github (`git push --tags`)
6. Create a new release on Github and attach the zip file.
7. (later) Upload the new version to the Chrome store.

## License
All code is licensed under the [MIT license](LICENSE).

[1]: https://www.procyclingstats.com/
[2]: https://developer.chrome.com/extensions/getstarted#load
[3]: https://github.com/djfpaagman/chrome-pcs-tooltip/releases
