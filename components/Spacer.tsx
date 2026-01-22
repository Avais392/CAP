export default function Spacer({ height = "100vh" }: { height?: string }) {
    return <div style={{ height }} className="w-full relative z-20 pointer-events-none" />;
}
