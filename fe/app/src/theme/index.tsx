import { Computer, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { forwardRef } from "react"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@core/ui"

const Bar = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "border-round drop-shadow-3xl absolute start-[0.125rem] mx-auto block h-0.5 w-6 bg-[currentColor] dark:text-gray-400 dark:drop-shadow-none",
        className,
      )}
    />
  )
}

const BurgerIcon = () => {
  return (
    <span aria-hidden className="pointer-events-none relative block h-6 w-6">
      <Bar className="top-[0.2rem]" />
      <Bar className="top-[0.6875rem]" />
      <Bar className="bottom-[0.2rem]" />
    </span>
  )
}
export const ToggleMenuButton = forwardRef<HTMLButtonElement, { className?: string }>(
  ({ ...props }, ref) => {
    return (
      <Button
        variant={null}
        size="icon"
        ref={ref}
        {...props}
        aria-label="open nav bar"
        className={cn("relative cursor-pointer", props.className)}
      >
        <BurgerIcon />
      </Button>
    )
  },
)
ToggleMenuButton.displayName = "ToggleMenuButton"

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={null} size="icon" className={className}>
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-around"
        >
          Light
          <Sun className="h-[20px] w-[20px]" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-around"
        >
          Dark
          <Moon className="h-[20px] w-[20px]" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-around"
        >
          System
          <Computer className="h-[20px] w-[20px]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
