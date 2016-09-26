'use babel';

import Live-ditView from './live--edit-view';
import { CompositeDisposable } from 'atom';

export default {

  live-ditView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.live-ditView = new Live-ditView(state.live-ditViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.live-ditView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'live--edit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.live-ditView.destroy();
  },

  serialize() {
    return {
      live-ditViewState: this.live-ditView.serialize()
    };
  },

  toggle() {
    console.log('Live-dit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
