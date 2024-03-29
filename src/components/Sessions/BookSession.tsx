import { FormEvent, useEffect, useRef } from 'react'
import Modal, { ModalHandle } from '../UI/Modal'
import { Session, useSessionsContext } from '../../store/sessions-context';
import Input from '../UI/Input';
import Button from '../UI/Button';
type BookSessionProps = {
    session: Session;
    onDone: () => void; // onDone will "tell" the parent component that the BookSession component should be removed from the DOM
  };

export default function BookSession({session, onDone}: BookSessionProps) {

    const modal = useRef<ModalHandle>(null);
    const sessionCtx = useSessionsContext();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data= Object.fromEntries(formData);
        console.log(data);
        sessionCtx.bookSession(session)
        onDone();
    }

  return (
    <Modal ref={modal} onClose={onDone}>
        <h2>Book Session</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Your name" id="name" name="name" type="text" />
        <Input label="Your email" id="email" name="email" type="email" />
        <p className="actions">
          <Button type="button" textOnly onClick={onDone}>
            Cancel
          </Button>
          <Button>Book Session</Button>
        </p>
      </form>
    </Modal>
  )
}
