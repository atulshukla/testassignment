import {
  EditorState,
  Plugin,
  TextSelection,
} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema } from "prosemirror-schema-basic";
import { exampleSetup } from "prosemirror-example-setup";

const wholeWordSelectionPlugin = new Plugin({
  props: {
    createSelectionBetween: (view, anchor1, head1) =>{
      if(anchor1.pos === head1.pos){
        return false
      }
      const doc = view.state.doc
      let start = null
      let end = null
      let head = head1, anchor = anchor1
      if(anchor1.pos > head1.pos){
        head = anchor1
        anchor = head1
      }
      let text  = doc.textBetween(head.pos, head.after(), "\n");
      end = doc.resolve(head.pos + text.split(' ')[0].length)
      text  = doc.textBetween(anchor.before(), anchor.pos, "\n");
      start = doc.resolve(anchor.pos - text.split(' ')[text.split(' ').length-1].length)
      return new TextSelection(start, end)
    }
  },
});

const editorView = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    schema,
    plugins: [].concat(
      exampleSetup({ schema }),
      wholeWordSelectionPlugin
    ),
  }),
});


